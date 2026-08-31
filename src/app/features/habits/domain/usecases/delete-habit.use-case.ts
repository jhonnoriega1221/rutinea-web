import { inject, Injectable } from "@angular/core";
import { IndexedDbHabitRepository } from "../../data/habit-indexed-db.repository";

@Injectable({
  providedIn: "root"
})
export class DeleteHabitUseCase {
  private readonly _habitRepository = inject(IndexedDbHabitRepository);

  execute(id: string) {
    return this._habitRepository.deleteHabit(id);
  }
}
