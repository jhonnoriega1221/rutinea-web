import { Component } from "@angular/core";
import { DatesHorizontalPicker } from "../dates-horizontal-picker/dates-horizontal-picker";
import { HabitAgendaList } from "../habits-agenda-list/habits-agenda-list";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HlmToggleGroupImports } from "@spartan-ng/helm/toggle-group";
import { NgIcon } from "@ng-icons/core";

@Component({
  imports: [DatesHorizontalPicker, HabitAgendaList, HlmButtonImports, HlmToggleGroupImports, NgIcon],
  selector: "app-daily-habits-panel",
  styleUrl: "./daily-habits-panel.css",
  templateUrl: "./daily-habits-panel.html"
})
export class DailyHabitsPanel {}
