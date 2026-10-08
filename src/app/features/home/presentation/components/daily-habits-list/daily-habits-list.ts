import { Component, signal } from "@angular/core";
import { NgIcon } from "@ng-icons/core";
import { HlmCheckboxImports } from "@spartan-ng/helm/checkbox";
import { HlmCheckbox } from "../../../../../../../libs/ui/checkbox/src";

@Component({
  imports: [NgIcon, HlmCheckboxImports],
  selector: "app-daily-habits-list",
  styleUrl: "./daily-habits-list.css",
  templateUrl: "./daily-habits-list.html"
})
export class HabitDailyList {
  readonly habits = signal<string[]>(["1", "1", "1", "1", "1"]);
}
