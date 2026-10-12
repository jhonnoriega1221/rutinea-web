import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild
} from "@angular/core";
import { CircularProgress } from "../../../../../shared/components/circular-progress/circular-progress";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { NgIcon } from "@ng-icons/core";
import { toDateKey } from "../../../../habits/domain/utils/day-state.util";
export interface CalendarDate {
  dateKey: string;
  dayInitial: string;
  formattedDate: string;
  isToday: boolean;
  fullDate: Date;
}

@Component({
  imports: [CircularProgress, HlmButtonImports, NgIcon],
  selector: "app-dates-horizontal-picker",
  styleUrl: "./dates-horizontal-picker.css",
  templateUrl: "./dates-horizontal-picker.html"
})
export class DatesHorizontalPicker {
  private readonly _strip = viewChild.required<ElementRef<HTMLElement>>("strip");

  readonly list = signal<CalendarDate[]>(this.generatePast30Days());
  readonly selectedDate = input<string>();
  readonly progressMap = input.required<Map<string, number>>();
  readonly changeDate = output<string>();

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

  private generatePast30Days(): CalendarDate[] {
    const dates: CalendarDate[] = [];
    const today = new Date();

    const initialFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });
    const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });

    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);

      const dayStr = String(d.getDate()).padStart(2, "0");
      const monthStr = monthFormatter.format(d);

      dates.push({
        dateKey: toDateKey(d),
        dayInitial: initialFormatter.format(d).slice(0, 2),
        formattedDate: `${dayStr}-${monthStr}`,
        isToday: i === 0,
        fullDate: d
      });
    }
    return dates;
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

  protected onClickDay(day: CalendarDate) {
    this.changeDate.emit(day.dateKey);
  }
}
