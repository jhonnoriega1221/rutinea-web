import { Component, computed, input, output } from "@angular/core";
import { HabitAgendaListViewModel } from "../../../../home/presentation/models/habit-agenda-list.view-model";
import { NgIcon } from "@ng-icons/core";
import { HlmCheckboxImports } from "@spartan-ng/helm/checkbox";
import { RouterLink } from "@angular/router";

@Component({
  imports: [NgIcon, HlmCheckboxImports, RouterLink],
  selector: "app-agenda-list",
  styleUrl: "./agenda-list.css",
  templateUrl: "./agenda-list.html"
})
export class AgendaList {
  readonly habits = input<HabitAgendaListViewModel[]>();
  readonly checkedChange = output<string>();
}
