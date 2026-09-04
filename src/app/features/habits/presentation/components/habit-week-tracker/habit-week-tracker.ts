import { Component, computed, input } from "@angular/core";
import { DayCell } from "../../../../record/domain/models/record.model";
import { DAY_LABELS, Weekday } from "../../../domain/models/habit.model";
import {
  getWeekDates,
  getWeekdayKey,
  resolveDayState,
  toDateKey
} from "../../../domain/utils/day-state.util";

@Component({
  selector: "app-habit-week-tracker",
  imports: [],
  templateUrl: "./habit-week-tracker.html",
  styleUrl: "./habit-week-tracker.css"
})
export class HabitWeekTracker {
  frequency = input.required<Weekday[]>();
  completedDays = input<string[]>([]); // yyyy-mm-dd
  createdAt = input<Date>();
  weekStartsOn = input<0 | 1>(0);
  enableColors = input<boolean>(true);

  protected readonly days = computed<DayCell[]>(() => {
    const scheduled = new Set(this.frequency());
    const completed = new Set(this.completedDays());
    const createdAt = this.createdAt();
    const todayKey = toDateKey(new Date());

    return getWeekDates(new Date(), this.weekStartsOn()).map((date) => ({
      key: getWeekDates(date),
      label: DAY_LABELS[getWeekdayKey(date)],
      isToday: toDateKey(date) === todayKey,
      state: resolveDayState({ date, scheduled, completed, createdAt })
    }));
  });
}
