import { Component, computed, inject, OnInit } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HomeGreeting } from "../../components/home-greeting/home-greeting";
import { HlmCardImports } from "@spartan-ng/helm/card";
import { KpiPanel } from "../../components/kpi-panel/kpi-panel";
import { DailyHabitsPanel } from "../../components/daily-habits-panel/daily-habits-panel";
import { HabitsFacade } from "../../../../habits/presentation/facade/habits.facade";
import { HabitLogsFacade } from "../../../../habits/presentation/facade/habit-logs.facade";
import { CreateHabitLogFormModel } from "../../../../habits/domain/models/habit-log.model";
import {
  getWeekDates,
  resolveDayState,
  toDateKey
} from "../../../../habits/domain/utils/day-state.util";
import { HabitAgendaListViewModel } from "../../models/habit-agenda-list.view-model";
import { Weekday, WEEKDAYS } from "../../../../habits/domain/models/habit.model";
import { getIconByKey } from "../../../../../shared/components/icons/habit-icons";
import { CategoriesFacade } from "../../../../categories/presentation/facade/categories.facade";
import { getColorByKey } from "../../../../../shared/components/color-picker/app-colors";

@Component({
  selector: "app-home-page",
  imports: [HlmButtonImports, HomeGreeting, HlmCardImports, KpiPanel, DailyHabitsPanel],
  standalone: true,
  templateUrl: "./home-page.html",
  styleUrl: "./home-page.css"
})
export class HomePage implements OnInit {
  private readonly _habitsFacade = inject(HabitsFacade);
  private readonly _habitLogsFacade = inject(HabitLogsFacade);
  private readonly _categoriesFacade = inject(CategoriesFacade);

  readonly habits = this._habitsFacade.habits;
  readonly habitLogs = this._habitLogsFacade.listLogsMap;
  readonly categories = this._categoriesFacade.categories;

  async ngOnInit() {
    await this._habitsFacade.loadAll();
    await this._categoriesFacade.loadAll();

    const habitIds = this._habitsFacade.habits().map((h) => h.id);
    if (habitIds.length > 0) {
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 29);

      await this._habitLogsFacade.loadLogsForHabitsList(habitIds, thirtyDaysAgo, today);
    }
  }

  async onCompleteHabit(habitLog: { habitId: string; logDateKey: string; isCompleted: boolean }) {
    if (!habitLog.isCompleted) {
      await this._habitLogsFacade.create({ habitId: habitLog.habitId, date: habitLog.logDateKey });
    } else {
      await this._habitLogsFacade.delete(habitLog.habitId, habitLog.logDateKey);
    }
  }

  readonly habitsForSelectedDate = computed<HabitAgendaListViewModel[]>(() => {
    const allHabits = this.habits();
    const today = new Date();
    const todayKey = toDateKey(today);
    const logsMap = this.habitLogs();

    const currentWeekDays = getWeekDates(today);
    const currentWeekDaysKeys = currentWeekDays.map((day) => toDateKey(day));

    return allHabits.map((habit) => {
      const category = this.categories().find((c) => c.id === habit.categoryId);

      const habitLogs = logsMap.get(habit.id) ?? new Set<string>();
      const isCompleted = habitLogs.has(todayKey);

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
        date: today,
        scheduled: scheduleDays,
        completed: isCompleted,
        createdAt: habit.createdAt
      });

      return {
        ...habit,
        icon: getIconByKey(habit.icon)!.icon,
        dayState,
        categoryInfo: category
          ? {
              id: habit.categoryId,
              name: category.name,
              color: category.color,
              cssVar: getColorByKey(category.color)?.cssVar!
            }
          : null
      };
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
}
