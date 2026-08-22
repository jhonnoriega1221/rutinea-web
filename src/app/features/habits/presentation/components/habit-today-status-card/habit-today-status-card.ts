import { Component, inject, input, output, signal, DestroyRef, computed } from "@angular/core";
import { DayState } from "../../../../record/domain/models/record.model";
import { getWeekdayKey, toDateKey } from "../../../domain/utils/day-state.util";
import { HlmCardImports } from "@spartan-ng/helm/card";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { NgIcon } from "@ng-icons/core";
import { Weekday } from "../../../domain/models/habit.model";

@Component({
  selector: "app-habit-today-status-card",
  imports: [HlmCardImports, HlmButtonImports, NgIcon],
  templateUrl: "./habit-today-status-card.html",
  styleUrl: "./habit-today-status-card.css"
})
export class HabitTodayStatusCard {
  status = input<DayState>("not-scheduled");

  markCompleted = output<void>();

  private readonly _now = signal(new Date());

  constructor() {
    const intervalId = setInterval(() => this._now.set(new Date()), 60_000);
    inject(DestroyRef).onDestroy(() => clearInterval(intervalId));
  }
}
