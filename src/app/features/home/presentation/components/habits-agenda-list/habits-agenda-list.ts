import { Component, signal } from "@angular/core";
import { NgIcon } from "@ng-icons/core";
import { HlmCheckboxImports } from "@spartan-ng/helm/checkbox";

@Component({
  imports: [NgIcon, HlmCheckboxImports],
  selector: "app-habits-agenda-list",
  styleUrl: "./habits-agenda-list.css",
  templateUrl: "./habits-agenda-list.html"
})
export class HabitAgendaList {
  readonly habits = signal<string[]>(["1", "1", "1", "1", "1"]);
}
