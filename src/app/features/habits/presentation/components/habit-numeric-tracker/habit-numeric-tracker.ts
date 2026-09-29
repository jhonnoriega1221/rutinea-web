import { Component, computed, input } from "@angular/core";
import { HabitFrequency } from "../../../domain/models/habit.model";
import { completionsThisWeek, getWeekDates, toDateKey } from "../../../domain/utils/day-state.util";

@Component({
  selector: "app-habit-numeric-tracker",
  imports: [],
  templateUrl: "./habit-numeric-tracker.html",
  styleUrl: "./habit-numeric-tracker.css"
})
export class HabitNumericTracker {
  weeklyGoal = input.required<number>();
  completedDates = input<Set<string>>();
  weekStartsOn = input<0 | 1>(0);

  protected readonly completionsThisWeek = computed(() => {
    const completed = this.completedDates();

    return completionsThisWeek(completed!);
  });
}
