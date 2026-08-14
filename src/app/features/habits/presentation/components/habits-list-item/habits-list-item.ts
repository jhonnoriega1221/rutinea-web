import { Component, computed, input, OnInit } from "@angular/core";
import { HlmCardImports } from "@spartan-ng/helm/card";
import { NgIcon } from "@ng-icons/core";
import { HabitWeekTracker } from "../habit-week-tracker/habit-week-tracker";
import { Habit } from "../../../domain/models/habit.model";
import { getIconByKey } from "../../../../../shared/components/icons/habit-icons";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-habits-list-item",
  imports: [HlmCardImports, NgIcon, HabitWeekTracker, RouterLink],
  templateUrl: "./habits-list-item.html",
  styleUrl: "./habits-list-item.css"
})
export class HabitsListItem {
  habit = input<Habit>();
  habitIcon = computed<string>(() => getIconByKey(this.habit()?.icon!)?.icon!);
}
