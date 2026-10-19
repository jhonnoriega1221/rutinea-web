import { Component, inject, input, output, signal } from "@angular/core";
import { NgIcon } from "@ng-icons/core";
import { BrnCalendar, BrnCalendarImports, injectBrnCalendarI18n } from "@spartan-ng/brain/calendar";
import { injectDateAdapter } from "@spartan-ng/brain/date-time";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HlmSelectImports } from "@spartan-ng/helm/select";
import { toDateKey, toDate } from "../../../../habits/domain/utils/day-state.util";

@Component({
  imports: [NgIcon, BrnCalendarImports, HlmButtonImports, HlmSelectImports],
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

  focusedDateChange = output<{ month: number; year: number }>();
  protected readonly _i18n = injectBrnCalendarI18n();
  protected readonly _dateAdapter = injectDateAdapter<Date>();
  protected readonly _todayKey = toDateKey(new Date());
  readonly todayDate = signal<Date>(new Date());

  protected goToToday(): void {
    const today = new Date();
    this._calendar.date.set(today);
    this.onFocusedDateChange();
    this.changeDate.emit(toDateKey(today));
  }

  protected onDayClick(date: Date): void {
    this.changeDate.emit(toDateKey(date));
  }

  protected isSelectedDay(date: Date): boolean {
    return this.selectedDate()! === toDateKey(date);
  }

  protected onFocusedDateChange(): void {
    const actualDate = this._calendar.focusedDate() as Date;
    this.focusedDateChange.emit({ month: actualDate.getMonth(), year: actualDate.getFullYear() });
  }
}
