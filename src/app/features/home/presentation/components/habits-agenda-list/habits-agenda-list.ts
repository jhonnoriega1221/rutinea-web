import { Component, computed, input, output, signal } from "@angular/core";
import { NgIcon } from "@ng-icons/core";
import { HlmCheckboxImports } from "@spartan-ng/helm/checkbox";
import { HabitAgendaListViewModel } from "../../models/habit-agenda-list.view-model";
import { CreateHabitLogFormModel } from "../../../../habits/domain/models/habit-log.model";

@Component({
  imports: [NgIcon, HlmCheckboxImports],
  selector: "app-habits-agenda-list",
  styleUrl: "./habits-agenda-list.css",
  templateUrl: "./habits-agenda-list.html"
})
export class HabitAgendaList {
  readonly habits = input<HabitAgendaListViewModel[]>();
  readonly checkedChange = output<string>();
  readonly maxSlots = 5;

  readonly emptySlots = computed(() => {
    const currentLength = this.habits()!.length;
    const remaining = Math.max(0, this.maxSlots - currentLength);
    return Array.from({ length: remaining });
  });
}
