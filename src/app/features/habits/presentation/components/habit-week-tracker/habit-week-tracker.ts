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
    const useColors = this.enableColors(); //TODO: Pensar en otro nombre para esta variable, ya que es para ver el progreso del mes en detalle del habito

    return getWeekDates(new Date(), this.weekStartsOn()).map((date) => {
      const isToday = toDateKey(date) === todayKey;
      const state = resolveDayState({
        date,
        scheduled: this.frequency(),
        completed: this.completedDates()?.has(toDateKey(date)) ?? false,
        createdAt
      });

      const textClasses = useColors ? "text-sm" : "text-base";
      let statusClasses = "";

      if (useColors) {
        if (state === "completed") {
          statusClasses = "text-success";
        } else if (state === "not-scheduled") {
          statusClasses = "text-foreground/20";
        } else {
          statusClasses = "text-foreground/50";
        }
      } else {
        statusClasses = state === "not-scheduled" ? "text-foreground/20" : "text-foreground";
      }

      const todayClasses = isToday && useColors ? "ring-2 ring-foreground/15 bg-foreground/10" : "";

      return {
        key: getWeekDates(date),
        label: DAY_LABELS[getWeekdayKey(date)],
        isToday: toDateKey(date) === todayKey,
        state,
        uiClasses: `${textClasses} ${statusClasses} ${todayClasses}`.trim()
      };
    });
  });
}
