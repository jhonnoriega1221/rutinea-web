import { Component, computed, inject, input, output, signal } from "@angular/core";
import { DatesHorizontalPicker } from "../dates-horizontal-picker/dates-horizontal-picker";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HlmToggleGroupImports } from "@spartan-ng/helm/toggle-group";
import { NgIcon } from "@ng-icons/core";
import {
  getWeekDates,
  resolveDayState,
  toDate,
  toDateKey
} from "../../../../habits/domain/utils/day-state.util";
import { ToggleValue } from "@spartan-ng/brain/toggle-group";
import { Habit, Weekday, WEEKDAYS } from "../../../../habits/domain/models/habit.model";
import { HabitAgendaListViewModel } from "../../models/habit-agenda-list.view-model";
import { getIconByKey } from "../../../../../shared/components/icons/habit-icons";
import { HabitAgendaList } from "../habits-agenda-list/habits-agenda-list";

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

  readonly habitsForSelectedDate = computed<HabitAgendaListViewModel[]>(() => {
    const allHabits = this.habits();
    const dateKey = this.selectedDate();
    const selectedDate = toDate(dateKey);
    const logsMap = this.habitLogs();

    const currentWeekDays = getWeekDates(selectedDate);
    const currentWeekDaysKeys = currentWeekDays.map((day) => toDateKey(day));

    return allHabits.map((habit) => {
      const habitLogs = logsMap.get(habit.id) ?? new Set<string>();
      const isCompleted = habitLogs.has(dateKey);

      let scheduleDays = new Set<Weekday>();

      if (habit.frequencyData.type === "everyday") {
        scheduleDays = new Set(WEEKDAYS);
      } else if (habit.frequencyData.type === "specific_days") {
        scheduleDays = new Set(habit.frequencyData.days);
      } else if (habit.frequencyData.type === "days_per_week") {
        const completionsThisWeek = currentWeekDaysKeys.filter((key) => habitLogs.has(key)).length;
        const quota = habit.frequencyData.count;

        if (completionsThisWeek >= quota) {
          scheduleDays = new Set<Weekday>();
        } else {
          scheduleDays = new Set(WEEKDAYS);
        }
      }

      const dayState = resolveDayState({
        date: selectedDate,
        scheduled: scheduleDays,
        completed: isCompleted,
        createdAt: habit.createdAt
      });

      return { ...habit, icon: getIconByKey(habit.icon)!.icon, dayState };
    });
  });

  readonly dueCount = computed(
    () =>
      this.habitsForSelectedDate().filter(
        (h) => h.dayState === "pending" || h.dayState === "urgent" || h.dayState === "missed"
      ).length
  );
  readonly completedCount = computed(
    () => this.habitsForSelectedDate().filter((h) => h.dayState === "completed").length
  );

  readonly dueHabits = computed(() => {
    return this.habitsForSelectedDate()
      .filter((h) => h.dayState === "pending" || h.dayState === "urgent" || h.dayState === "missed")
      .slice(0, 5);
  });

  readonly completedHabits = computed(() => {
    return this.habitsForSelectedDate()
      .filter((h) => h.dayState === "completed")
      .slice(0, 5);
  });

  readonly summaryHabits = computed(() => {
    const isDueTab = this.selectedTab() === "due";

    return isDueTab ? this.dueHabits() : this.completedHabits();
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
