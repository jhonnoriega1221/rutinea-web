import { Component, computed, input, OnInit } from "@angular/core";
import { HlmCardImports } from "@spartan-ng/helm/card";
import { NgIcon } from "@ng-icons/core";
import { HabitWeekTracker } from "../habit-week-tracker/habit-week-tracker";
import { Weekday } from "../../../domain/models/habit.model";
import { getIconByKey } from "../../../../../shared/components/icons/habit-icons";
import { RouterLink } from "@angular/router";
import { HabitListViewModel } from "../../models/habit-list.view-model";
import { getColorByKey } from "../../../../../shared/components/color-picker/app-colors";
import { HabitNumericTracker } from "../habit-numeric-tracker/habit-numeric-tracker";

@Component({
  selector: "app-habits-list-item",
  imports: [HlmCardImports, NgIcon, HabitWeekTracker, RouterLink, HabitNumericTracker],
  templateUrl: "./habits-list-item.html",
  styleUrl: "./habits-list-item.css"
})
export class HabitsListItem {
  habit = input<HabitListViewModel>();

  protected readonly habitIcon = computed<string>(() => getIconByKey(this.habit()?.icon!)?.icon!);

  protected readonly categoryColor = computed<string>(
    () => getColorByKey(this.habit()?.categoryInfo?.color!)?.cssVar!
  );

  protected readonly habitWeekFrequency = computed(() => {
    const data = this.habit()?.frequencyData;
    if (data?.type === "specific_days") {
      return new Set<Weekday>(data.days);
    }
    if (data?.type === "days_per_week") {
      return data?.count;
    }
    return new Set<Weekday>(); // TODO: Considerar si mover esta logica la habit-page al momento de armar el view model del habit list item
  });
}
