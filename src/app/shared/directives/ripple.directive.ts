import { Directive, ElementRef, inject, input } from "@angular/core";

const EXPAND_MS = 450;
const FADE_MS = 250;
const RIPPLE_OPACITY = 0.2;

@Directive({
  selector: "[appRipple]",
  host: { "(pointerdown)": "onPointerDown($event)" }
})
export class Ripple {
  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private _container?: HTMLElement;

  readonly color = input("currentColor", { alias: "appRippleColor" });
  readonly disabled = input(false, { alias: "appRippleDisabled" });

  protected onPointerDown(event: PointerEvent): void {
    if (this.disabled() || !event.isPrimary || event.button > 0) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = this._host.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const radius = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y));

    const ripple = document.createElement("span");
    ripple.style.cssText =
      `position:absolute;border-radius:50%;pointer-events:none;opacity:0;` +
      `left:${x - radius}px;top:${y - radius}px;` +
      `width:${radius * 2}px;height:${radius * 2}px;background:${this.color()};`;
    this._getContainer().appendChild(ripple);

    const expand = ripple.animate(
      [
        { transform: "scale(0)", opacity: RIPPLE_OPACITY },
        { transform: "scale(1)", opacity: RIPPLE_OPACITY }
      ],
      { duration: EXPAND_MS, easing: "cubic-bezier(0.2, 0, 0, 1)", fill: "forwards" }
    );

    const released = new Promise<void>((resolve) => {
      const done = () => {
        removeEventListener("pointerup", done);
        removeEventListener("pointercancel", done);
        resolve();
      };
      addEventListener("pointerup", done);
      addEventListener("pointercancel", done);
    });

    Promise.all([expand.finished, released])
      .then(
        () =>
          ripple.animate([{ opacity: RIPPLE_OPACITY }, { opacity: 0 }], {
            duration: FADE_MS,
            fill: "forwards"
          }).finished
      )
      .catch(() => {})
      .finally(() => ripple.remove());
  }

  private _getContainer(): HTMLElement {
    if (!this._container) {
      if (getComputedStyle(this._host).position === "static") {
        this._host.style.position = "relative";
      }
      const container = document.createElement("span");
      container.setAttribute("aria-hidden", "true");
      container.className =
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]";
      this._host.appendChild(container);
      this._container = container;
    }
    return this._container;
  }
}
