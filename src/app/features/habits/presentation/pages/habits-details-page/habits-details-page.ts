import { Component } from "@angular/core";
import { HlmCardImports } from "@spartan-ng/helm/card";
import { NgIcon } from "@ng-icons/core";
import { HabitWeekTracker } from "../../components/habit-week-tracker/habit-week-tracker";

@Component({
  selector: "app-habits-details-page",
  imports: [HlmCardImports, NgIcon, HabitWeekTracker],
  templateUrl: "./habits-details-page.html",
  styleUrl: "./habits-details-page.css"
})
export class HabitsDetailsPage {}
