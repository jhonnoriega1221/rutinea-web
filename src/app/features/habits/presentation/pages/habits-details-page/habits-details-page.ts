import { Component } from "@angular/core";
import { HlmCardImports } from "@spartan-ng/helm/card";
import { NgIcon } from "@ng-icons/core";
import { HabitWeekTracker } from "../../components/habit-week-tracker/habit-week-tracker";
import { HabitCalendarTracker } from "../../components/habit-calendar-tracker/habit-calendar-tracker";
import { toDateKey } from "../../../domain/utils/day-state.util";

@Component({
  selector: "app-habits-details-page",
  imports: [HlmCardImports, NgIcon, HabitWeekTracker, HabitCalendarTracker],
  templateUrl: "./habits-details-page.html",
  styleUrl: "./habits-details-page.css"
})
export class HabitsDetailsPage {}
