import { Component, computed, inject, input, OnInit, signal } from "@angular/core";
import { HlmCardImports } from "@spartan-ng/helm/card";
import { NgIcon } from "@ng-icons/core";
import { HabitWeekTracker } from "../../components/habit-week-tracker/habit-week-tracker";
import { HabitCalendarTracker } from "../../components/habit-calendar-tracker/habit-calendar-tracker";
import { HabitsFacade } from "../../facade/habits.facade";
import { Habit } from "../../../domain/models/habit.model";
import { getIconByKey } from "../../../../../shared/components/icons/habit-icons";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HabitTodayStatusCard } from "../../components/habit-today-status-card/habit-today-status-card";
import { resolveDayState, toDateKey } from "../../../domain/utils/day-state.util";
import { DayState } from "../../../../record/domain/models/record.model";
import { URGENT_DATE_THRESHOLD } from "../../../domain/constants/habit-constants";
import { ResponsiveDialogSheet } from "../../../../../shared/components/responsive-dialog-sheet/responsive-dialog-sheet";
import { HabitDateInfo } from "../../components/habit-date-info/habit-date-info";
@Component({
  selector: "app-habits-details-page",
  imports: [
    HlmCardImports,
    NgIcon,
    HabitWeekTracker,
    HabitCalendarTracker,
    HlmButtonImports,
    HabitTodayStatusCard,
    ResponsiveDialogSheet,
    HabitDateInfo
  ],
  templateUrl: "./habits-details-page.html",
  styleUrl: "./habits-details-page.css"
})
export class HabitsDetailsPage implements OnInit {
  id = input.required<string>();

  private readonly _habitsFacade = inject(HabitsFacade);

  protected readonly habit = signal<Habit | undefined>(undefined);
  protected readonly habitIcon = computed<string>(() => getIconByKey(this.habit()?.icon!)?.icon!);

  protected readonly dateSelected = signal<Date | undefined>(undefined);

  protected readonly todayStatus = computed<DayState>(() => {
    const currentHabit = this.habit();
    if (!currentHabit) return "not-scheduled";

    const scheduled = new Set(currentHabit.frequency);
    const completedDates = new Set<string>();

    return resolveDayState({
      date: new Date(),
      scheduled,
      completed: completedDates,
      createdAt: currentHabit.createdAt,
      urgentThresholdHours: URGENT_DATE_THRESHOLD
    });
  });

  async ngOnInit() {
    const selectedHabit = await this._habitsFacade.getById(this.id());
    this.habit.set(selectedHabit);
  }

  onMarkCompleted(habitId: string) {
    console.log("mark event ", habitId, " as completed");
  }
}
