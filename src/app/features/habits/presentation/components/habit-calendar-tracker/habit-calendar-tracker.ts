import { Component, computed, inject, input, output, viewChild } from "@angular/core";
import { NgIcon } from "@ng-icons/core";
import { BrnCalendar, BrnCalendarImports, injectBrnCalendarI18n } from "@spartan-ng/brain/calendar";
import { injectDateAdapter } from "@spartan-ng/brain/date-time";
import { HlmButton, HlmButtonImports } from "@spartan-ng/helm/button";
import { HlmSelect, HlmSelectImports } from "@spartan-ng/helm/select";
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
  frequency = input.required<Set<Weekday>>();
  completedDates = input<Set<string>>();

  dayClicked = output<Date>();
  focusedDateChange = output<{ month: number; year: number }>();

  prevBtn = viewChild.required<HlmButton>("prevBtn");

  protected readonly _i18n = injectBrnCalendarI18n();
  protected readonly _dateAdapter = injectDateAdapter<Date>();
  private readonly _calendar = inject(BrnCalendar);

  private readonly _yearSelect = viewChild.required<HlmSelect>("");

  protected readonly _todayKey = toDateKey(new Date());

  protected resolveState(date: Date) {
    return resolveDayState({
      date,
      scheduled: this.frequency(),
      completed: this.completedDates()?.has(toDateKey(date)) ?? false,
      createdAt: this.trackStart()
    });
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

  protected onFocusedDateChange(): void {
    const actualDate = this._calendar.focusedDate() as Date;
    this.focusedDateChange.emit({ month: actualDate.getMonth(), year: actualDate.getFullYear() });
  }

  protected goToToday(): void {
    const today = new Date();
    this._calendar.date.set(today);
    this.onFocusedDateChange();
  }
}
