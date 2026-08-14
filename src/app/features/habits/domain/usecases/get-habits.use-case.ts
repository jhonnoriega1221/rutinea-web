import { inject, Injectable } from "@angular/core";
import { IndexedDbHabitRepository } from "../../data/habit-indexed-db.repository";

@Injectable({
  providedIn: "root"
})
export class GetHabitsUseCase {
  private readonly _repository = inject(IndexedDbHabitRepository);

  execute() {
    return this._repository.getHabits();
  }
}
