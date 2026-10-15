import { Component, computed, input, output, signal } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { NgIcon } from "@ng-icons/core";
import { RouterLink } from "@angular/router";
import { toDateKey } from "../../../../habits/domain/utils/day-state.util";
import { HabitAgendaListViewModel } from "../../models/habit-agenda-list.view-model";
import { HabitAgendaList } from "../habits-agenda-list/habits-agenda-list";
import { DataState } from "../../../../../shared/components/data-state/data-state";

@Component({
  imports: [HabitAgendaList, HlmButtonImports, NgIcon, DataState, RouterLink],
  selector: "app-daily-habits-panel",
  styleUrl: "./daily-habits-panel.css",
  templateUrl: "./daily-habits-panel.html"
})
export class DailyHabitsPanel {
  readonly habitsForSelectedDate = input.required<HabitAgendaListViewModel[]>();
  readonly dueCount = input.required<number>();
  readonly completedCount = input.required<number>();
  protected readonly selectedTab = signal<"due" | "completed">("due");

  readonly changeDate = output<string>();
  readonly changeTab = output<"due" | "completed">();
  readonly completeHabit = output<{ habitId: string; logDateKey: string; isCompleted: boolean }>();

  readonly dueHabits = computed(() => {
    return this.habitsForSelectedDate()
      .filter((h) => h.dayState === "pending" || h.dayState === "urgent" || h.dayState === "missed")
      .slice(0, 5);
  });

  onToggleHabitCompletion(habitId: string) {
    const selectedDate = toDateKey(new Date());
    const isCompleted = this.selectedTab() === "completed";

    this.completeHabit.emit({ habitId, logDateKey: selectedDate, isCompleted });
  }
}
