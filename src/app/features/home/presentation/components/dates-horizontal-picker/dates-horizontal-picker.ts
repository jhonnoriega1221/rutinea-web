import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild
} from "@angular/core";
import { CircularProgress } from "../../../../../shared/components/circular-progress/circular-progress";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { NgIcon } from "@ng-icons/core";

@Component({
  imports: [CircularProgress, HlmButtonImports, NgIcon],
  selector: "app-dates-horizontal-picker",
  styleUrl: "./dates-horizontal-picker.css",
  templateUrl: "./dates-horizontal-picker.html"
})
export class DatesHorizontalPicker {
  private readonly _strip = viewChild.required<ElementRef<HTMLElement>>("strip");

  protected readonly canScrollLeft = signal(false);
  protected readonly canScrollRight = signal(false);
  private _destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const el = this._strip().nativeElement;

      el.scrollLeft = el.scrollWidth;

      const observer = new ResizeObserver(() => this.updateArrows());
      observer.observe(el);
      if (el.firstElementChild) observer.observe(el.firstElementChild);
      this._destroyRef.onDestroy(() => observer.disconnect());

      this.updateArrows();
    });
  }

  protected updateArrows(): void {
    const el = this._strip().nativeElement;
    const maxScroll = el.scrollWidth - el.clientWidth;

    this.canScrollLeft.set(el.scrollLeft > 1);
    this.canScrollRight.set(el.scrollLeft < maxScroll - 1);
  }

  protected scrollByPage(direction: 1 | -1): void {
    const el = this._strip().nativeElement;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  readonly list = signal<string[]>([
    "1",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2"
  ]);
}
