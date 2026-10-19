import { Component, effect, inject, input, OnInit, output, signal } from "@angular/core";
import { NgIcon } from "@ng-icons/core";
import { BrnCalendar, BrnCalendarImports, injectBrnCalendarI18n } from "@spartan-ng/brain/calendar";
import { injectDateAdapter } from "@spartan-ng/brain/date-time";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HlmSelectImports } from "@spartan-ng/helm/select";
import { toDateKey, toDate } from "../../../../habits/domain/utils/day-state.util";
import { CircularProgress } from "../../../../../shared/components/circular-progress/circular-progress";

@Component({
  imports: [NgIcon, BrnCalendarImports, HlmButtonImports, HlmSelectImports, CircularProgress],
  selector: "app-calendar-date-picker",
  styleUrl: "./calendar-date-picker.css",
  templateUrl: "./calendar-date-picker.html",
  hostDirectives: [
    {
      directive: BrnCalendar,
      inputs: ["min", "max", "date", "defaultFocusedDate", "weekStartsOn"],
      outputs: ["dateChange"]
    }
  ]
})
export class CalendarDatePicker {
  private readonly _calendar = inject(BrnCalendar);
  readonly selectedDate = input<string>();
  readonly changeDate = output<string>();

  protected readonly _i18n = injectBrnCalendarI18n();
  protected readonly _dateAdapter = injectDateAdapter<Date>();
  protected readonly _todayKey = toDateKey(new Date());
  readonly todayDate = signal<Date>(new Date());

  protected goToToday(): void {
    const today = new Date();
    this._calendar.date.set(today);
    this.changeDate.emit(toDateKey(today));
  }

  constructor() {
    effect(() => {
      const selectedDateKey = this.selectedDate();
      if (selectedDateKey) {
        const selectedDate = toDate(selectedDateKey);

        this._calendar.date.set(selectedDate);
        this._calendar.focusedDate.set(selectedDate);
      }
    });
  }

  protected onDayClick(date: Date): void {
    this._calendar.date.set(date);
    this.changeDate.emit(toDateKey(date));
  }

  protected isSelectedDay(date: Date): boolean {
    return this.selectedDate()! === toDateKey(date);
  }
}
