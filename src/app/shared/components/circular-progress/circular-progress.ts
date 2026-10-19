import { Component, computed, input } from "@angular/core";

@Component({
  imports: [],
  selector: "app-circular-progress",
  styleUrl: "./circular-progress.css",
  templateUrl: "./circular-progress.html"
})
export class CircularProgress {
  readonly value = input<number>(0);
  readonly size = input<number>(80);
  readonly hidePercent = input<boolean>(false);
  readonly strokeWidth = input<number>(8);

  protected readonly radius = 40;
  protected readonly circumference = 2 * Math.PI * this.radius;

  protected readonly dashOffset = computed(() => {
    const progress = Math.min(100, Math.max(0, this.value()));
    return this.circumference - (progress / 100) * this.circumference;
  });
}
