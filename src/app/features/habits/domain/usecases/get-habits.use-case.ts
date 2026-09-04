import { inject, Injectable } from "@angular/core";
import { HabitRepository } from "../repositories/habit.repository";

@Injectable({
  providedIn: "root"
})
export class GetHabitsUseCase {
  private readonly _repository = inject(HabitRepository);

  execute() {
    return this._repository.getHabits();
  }
}
