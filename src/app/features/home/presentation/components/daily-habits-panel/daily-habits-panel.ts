import { Component, computed, input, output, signal } from "@angular/core";
import { DatesHorizontalPicker } from "../dates-horizontal-picker/dates-horizontal-picker";
import { HabitAgendaList } from "../habits-agenda-list/habits-agenda-list";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HlmToggleGroupImports } from "@spartan-ng/helm/toggle-group";
import { NgIcon } from "@ng-icons/core";
import { toDateKey } from "../../../../habits/domain/utils/day-state.util";
import { ToggleValue } from "@spartan-ng/brain/toggle-group";
import { Habit } from "../../../../habits/domain/models/habit.model";
import { HabitLog } from "../../../../habits/domain/models/habit-log.model";
import { HabitAgentaList } from "../../models/habit-agenda-list.view-model";
import { getIconByKey } from "../../../../../shared/components/icons/habit-icons";

@Component({
  imports: [
    DatesHorizontalPicker,
    HabitAgendaList,
    HlmButtonImports,
    HlmToggleGroupImports,
    NgIcon
  ],
  selector: "app-daily-habits-panel",
  styleUrl: "./daily-habits-panel.css",
  templateUrl: "./daily-habits-panel.html"
})
export class DailyHabitsPanel {
  readonly habits = input.required<Habit[]>();
  readonly habitLogs = input.required<Map<string, Set<string>>>();

  protected readonly selectedTab = signal<"due" | "completed">("due");
  protected readonly selectedDate = signal<string>(toDateKey(new Date()));

  readonly changeDate = output<string>();
  readonly changeTab = output<"due" | "completed">();

  readonly habitsForSelectedDate = computed<HabitAgentaList[]>(() => {
    const allHabits = this.habits();
    const dateKey = this.selectedDate();
    const logsMap = this.habitLogs();

    return allHabits.map((habit) => {
      const isCompleted = logsMap.get(habit.id)?.has(dateKey) ?? false;
      return { ...habit, icon: getIconByKey(habit.icon)!.icon, isCompleted };
    });
  });

  readonly dueCount = computed(
    () => this.habitsForSelectedDate().filter((h) => !h.isCompleted).length
  );
  readonly completedCount = computed(
    () => this.habitsForSelectedDate().filter((h) => h.isCompleted).length
  );

  readonly summaryHabits = computed(() => {
    const isDueTab = this.selectedTab() === "due";

    return this.habitsForSelectedDate()
      .filter((h) => h.isCompleted !== isDueTab)
      .slice(0, 5);
  });

  onChangeDate(date: string) {
    this.selectedDate.set(date);
    this.changeDate.emit(date);
  }

  onChangeTab(tabOption: ToggleValue<"due" | "completed">) {
    const selectedTab = tabOption!.toString() as "due" | "completed";
    this.selectedTab.set(selectedTab);
    this.changeTab.emit(selectedTab);
  }
}
