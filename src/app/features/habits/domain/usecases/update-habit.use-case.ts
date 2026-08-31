import { inject, Injectable } from "@angular/core";
import { CreateHabitFormModel, Habit } from "../models/habit.model";
import { IndexedDbHabitRepository } from "../../data/habit-indexed-db.repository";

@Injectable({
  providedIn: "root"
})
export class UpdateHabitUseCase {
  private readonly _repository = inject(IndexedDbHabitRepository);

  execute(data: Habit) {
    const habit: Habit = {
      ...data,
      updatedAt: new Date()
    };
    return this._repository.updateHabit(habit);
  }
}
