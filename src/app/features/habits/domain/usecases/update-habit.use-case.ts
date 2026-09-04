import { inject, Injectable } from "@angular/core";
import { Habit } from "../models/habit.model";
import { HabitRepository } from "../repositories/habit.repository";

@Injectable({
  providedIn: "root"
})
export class UpdateHabitUseCase {
  private readonly _repository = inject(HabitRepository);

  execute(data: Habit) {
    const habit: Habit = {
      ...data,
      updatedAt: new Date()
    };
    return this._repository.updateHabit(habit);
  }
}
