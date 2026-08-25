import { inject, Injectable } from "@angular/core";
import { IndexedDbHabitRepository } from "../../data/habit-indexed-db.repository";

@Injectable({
  providedIn: "root"
})
export class GetHabitByIdUseCase {
  private readonly _repository = inject(IndexedDbHabitRepository);

  execute(id: string) {
    return this._repository.getHabitById(id);
  }
}
