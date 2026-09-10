import { Component, computed, input } from "@angular/core";
import { DayCell } from "../../../domain/models/habit-log.model";
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
  frequency = input.required<Set<Weekday>>();
  completedDates = input<Set<string>>(); // yyyy-mm-dd
  createdAt = input<Date>();
  weekStartsOn = input<0 | 1>(0);
  enableColors = input<boolean>(true);

  protected readonly days = computed<DayCell[]>(() => {
    const createdAt = this.createdAt();
    const todayKey = toDateKey(new Date());

    return getWeekDates(new Date(), this.weekStartsOn()).map((date) => ({
      key: getWeekDates(date),
      label: DAY_LABELS[getWeekdayKey(date)],
      isToday: toDateKey(date) === todayKey,
      state: resolveDayState({
        date,
        scheduled: this.frequency(),
        completed: this.completedDates()?.has(toDateKey(date)) ?? false,
        createdAt
      })
    }));
  });
}
