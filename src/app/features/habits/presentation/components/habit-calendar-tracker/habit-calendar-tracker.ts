import { Component, computed, inject, input, output } from "@angular/core";
import { NgIcon } from "@ng-icons/core";
import { BrnCalendar, BrnCalendarImports, injectBrnCalendarI18n } from "@spartan-ng/brain/calendar";
import { injectDateAdapter } from "@spartan-ng/brain/date-time";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HlmSelectImports } from "@spartan-ng/helm/select";
import { Weekday } from "../../../domain/models/habit.model";
import { resolveDayState, toDateKey } from "../../../domain/utils/day-state.util";

@Component({
  selector: "app-habit-calendar-tracker",
  imports: [NgIcon, BrnCalendarImports, HlmButtonImports, HlmSelectImports],
  templateUrl: "./habit-calendar-tracker.html",
  styleUrl: "./habit-calendar-tracker.css",
  hostDirectives: [
    {
      directive: BrnCalendar,
      inputs: ["min", "max", "date", "defaultFocusedDate", "weekStartsOn"],
      outputs: ["dateChange"]
    }
  ]
})
export class HabitCalendarTracker {
  trackStart = input<Date>();
  frequency = input.required<Weekday[]>();
  completedDates = input<string[]>([]);

  dayClicked = output<Date>();

  protected readonly _i18n = injectBrnCalendarI18n();
  protected readonly _dateAdapter = injectDateAdapter<Date>();
  private readonly _calendar = inject(BrnCalendar);

  private readonly _scheduled = computed(() => new Set(this.frequency()));
  private readonly _completed = computed(() => new Set(this.completedDates()));
  protected readonly _todayKey = toDateKey(new Date());

  protected resolveState(date: Date) {
    return resolveDayState(date, this._scheduled(), this._completed(), this.trackStart());
  }

  protected isToday(date: Date): boolean {
    return toDateKey(date) === this._todayKey;
  }

  protected isCurrentWeek(week: Date[]): boolean {
    return week.some((date) => this.isToday(date));
  }

  protected onDayClick(date: Date): void {
    this.dayClicked.emit(date);
  }

  protected goToToday(): void {
    const today = new Date();
    this._calendar.date.set(today);
  }
}
