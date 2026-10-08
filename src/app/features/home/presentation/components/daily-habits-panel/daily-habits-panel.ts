import { Component } from "@angular/core";
import { DatesHorizontalPicker } from "../dates-horizontal-picker/dates-horizontal-picker";
import { HabitDailyList } from "../daily-habits-list/daily-habits-list";
import { HlmButton, HlmButtonImports } from "@spartan-ng/helm/button";
import { HlmToggleGroup, HlmToggleGroupImports } from "@spartan-ng/helm/toggle-group";
import { NgIcon } from "@ng-icons/core";

@Component({
  imports: [DatesHorizontalPicker, HabitDailyList, HlmButtonImports, HlmToggleGroupImports, NgIcon],
  selector: "app-daily-habits-panel",
  styleUrl: "./daily-habits-panel.css",
  templateUrl: "./daily-habits-panel.html"
})
export class DailyHabitsPanel {}
