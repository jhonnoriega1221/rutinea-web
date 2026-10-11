import { Component, input, signal } from "@angular/core";
import { NgIcon } from "@ng-icons/core";
import { HlmCheckboxImports } from "@spartan-ng/helm/checkbox";
import { HabitAgendaListViewModel } from "../../models/habit-agenda-list.view-model";

@Component({
  imports: [NgIcon, HlmCheckboxImports],
  selector: "app-habits-agenda-list",
  styleUrl: "./habits-agenda-list.css",
  templateUrl: "./habits-agenda-list.html"
})
export class HabitAgendaList {
  readonly habits = input<HabitAgendaListViewModel[]>();
}
