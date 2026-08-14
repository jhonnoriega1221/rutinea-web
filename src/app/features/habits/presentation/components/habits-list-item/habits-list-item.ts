import { Component } from "@angular/core";
import { HlmCardImports } from "@spartan-ng/helm/card";
import { NgIcon } from "@ng-icons/core";
import { HabitWeekTracker } from "../habit-week-tracker/habit-week-tracker";

@Component({
  selector: "app-habits-list-item",
  imports: [HlmCardImports, NgIcon, HabitWeekTracker],
  templateUrl: "./habits-list-item.html",
  styleUrl: "./habits-list-item.css"
})
export class HabitsListItem {}
