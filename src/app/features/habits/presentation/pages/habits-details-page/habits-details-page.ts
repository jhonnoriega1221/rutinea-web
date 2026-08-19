import { Component, inject, input, OnInit, resource, signal } from "@angular/core";
import { HlmCardImports } from "@spartan-ng/helm/card";
import { NgIcon } from "@ng-icons/core";
import { HabitWeekTracker } from "../../components/habit-week-tracker/habit-week-tracker";
import { HabitCalendarTracker } from "../../components/habit-calendar-tracker/habit-calendar-tracker";
import { HabitsFacade } from "../../facade/habits.facade";
import { Habit } from "../../../domain/models/habit.model";

@Component({
  selector: "app-habits-details-page",
  imports: [HlmCardImports, NgIcon, HabitWeekTracker, HabitCalendarTracker],
  templateUrl: "./habits-details-page.html",
  styleUrl: "./habits-details-page.css"
})
export class HabitsDetailsPage implements OnInit {
  id = input.required<string>();

  private readonly _habitsFacade = inject(HabitsFacade);

  protected readonly habit = signal<Habit | undefined>(undefined);

  async ngOnInit() {
    const selectedHabit = await this._habitsFacade.getById(this.id());
    this.habit.set(selectedHabit);
  }
}
