import { inject, Injectable } from "@angular/core";
import { CreateHabitFormModel, Habit } from "../models/habit.model";
import { IndexedDbHabitRepository } from "../../data/habit-indexed-db.repository";

@Injectable({
  providedIn: "root"
})
export class CreateHabitUseCase {
  private readonly _repository = inject(IndexedDbHabitRepository);

  execute(data: CreateHabitFormModel) {
    const habit: Habit = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "active"
    };
    return this._repository.createHabit(habit);
  }
}
