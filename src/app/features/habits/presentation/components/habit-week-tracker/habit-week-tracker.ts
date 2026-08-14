import { Component, computed, input, signal } from "@angular/core";
import { DayCell, DayState } from "../../../../record/domain/models/record.model";
import { WEEK_DAYS, Weekday, WEEKDAYS } from "../../../domain/models/habit.model";

@Component({
  selector: "app-habit-week-tracker",
  imports: [],
  templateUrl: "./habit-week-tracker.html",
  styleUrl: "./habit-week-tracker.css"
})
export class HabitWeekTracker {
  frequency = input.required<Weekday[]>();
  completedDays = input<Weekday[]>([]);
  enableColors = input<boolean>(true);

  protected readonly days = computed<DayCell[]>(() => {
    const scheduled = new Set(this.frequency());
    const completed = new Set(this.completedDays());
    const todayIndex = this._todayIndex();

    return WEEK_DAYS.map((day, index) => ({
      key: day.key,
      label: day.label,
      isToday: index === todayIndex,
      state: this._resolveState(day.key, index, todayIndex, scheduled, completed)
    }));
  });

  private _resolveState(
    dayKey: string,
    dayIndex: number,
    todayIndex: number,
    scheduled: Set<string>,
    completed: Set<string>
  ): DayState {
    if (!scheduled.has(dayKey)) return "not-scheduled";
    if (completed.has(dayKey)) return "completed";
    if (dayIndex >= todayIndex) return "pending";
    return "missed";
  }

  private _todayIndex(): number {
    const jsDay = new Date().getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  }
}
