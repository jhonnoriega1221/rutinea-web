import { Component, computed, inject, input, OnInit, signal, viewChild } from "@angular/core";
import { Location } from "@angular/common";
import { HlmCardImports } from "@spartan-ng/helm/card";
import { NgIcon } from "@ng-icons/core";
import { HabitWeekTracker } from "../../components/habit-week-tracker/habit-week-tracker";
import { HabitCalendarTracker } from "../../components/habit-calendar-tracker/habit-calendar-tracker";
import { HabitsFacade } from "../../facade/habits.facade";
import { getIconByKey } from "../../../../../shared/components/icons/habit-icons";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HabitTodayStatusCard } from "../../components/habit-today-status-card/habit-today-status-card";
import { resolveDayState } from "../../../domain/utils/day-state.util";
import { DayState } from "../../../domain/models/habit-log.model";
import { URGENT_DATE_THRESHOLD } from "../../../domain/constants/habit-constants";
import { ResponsivePopup } from "../../../../../shared/components/responsive-popup/responsive-popup";
import { HabitDateInfo } from "../../components/habit-date-info/habit-date-info";
import { HabitsCreateForm } from "../../components/habits-create-form/habits-create-form";
import { CreateHabitFormModel } from "../../../domain/models/habit.model";
import { ResponsiveDialogService } from "../../../../../shared/services/responsive-dialog.service";
import { toast } from "@spartan-ng/brain/sonner";

@Component({
  selector: "app-habits-details-page",
  imports: [
    HlmCardImports,
    NgIcon,
    HabitWeekTracker,
    HabitCalendarTracker,
    HlmButtonImports,
    HabitTodayStatusCard,
    ResponsivePopup,
    HabitDateInfo,
    HabitsCreateForm
  ],
  templateUrl: "./habits-details-page.html",
  styleUrl: "./habits-details-page.css"
})
export class HabitsDetailsPage implements OnInit {
  id = input.required<string>();
  location = inject(Location);

  private readonly _habitsFacade = inject(HabitsFacade);
  private readonly _dialog = inject(ResponsiveDialogService);

  protected readonly habit = this._habitsFacade.selectedHabit;
  protected readonly habitIcon = computed<string>(() => getIconByKey(this.habit()?.icon!)?.icon!);

  protected readonly dateSelected = signal<Date | undefined>(undefined);

  protected readonly createDialog = viewChild.required<ResponsivePopup>("createDialog");

  ngOnInit(): void {
    this._habitsFacade.getById(this.id());
  }

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

  onMarkCompleted(habitId: string) {
    console.log("mark event ", habitId, " as completed");
  }

  protected async onHabitSubmitted(model: CreateHabitFormModel) {
    const updateHabit = {
      ...this.habit()!,
      ...model
    };
    await this._habitsFacade.update(updateHabit);
    toast.success("Habit has been updated");
    this.createDialog().close();
  }

  protected async onDelete() {
    const confirmDelete = await this._dialog.open({
      type: "error",
      title: "Do you want to delete this habit?",
      message: "This action cannot be undone.",
      confirmButtonLabel: "Delete habit",
      cancelButtonLabel: "Cancel"
    });

    if (confirmDelete) {
      this.deleteHabit();
    }
  }

  protected async deleteHabit() {
    await this._habitsFacade.delete(this.id());
    toast.success("Habit has been deleted succefully");
    this.location.back();
  }
}
