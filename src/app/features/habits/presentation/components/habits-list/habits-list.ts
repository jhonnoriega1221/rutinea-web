import { Component, input } from "@angular/core";
import { HabitsListItem } from "../habits-list-item/habits-list-item";
import { Habit } from "../../../domain/models/habit.model";

@Component({
  selector: "app-habits-list",
  imports: [HabitsListItem],
  templateUrl: "./habits-list.html",
  styleUrl: "./habits-list.css"
})
export class HabitsList {
  habits = input<Habit[]>([]);
  logsMap = input.required<Map<string, Set<string>>>();
}
