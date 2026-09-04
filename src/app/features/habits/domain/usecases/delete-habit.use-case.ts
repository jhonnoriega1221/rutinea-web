import { inject, Injectable } from "@angular/core";
import { HabitRepository } from "../repositories/habit.repository";

@Injectable({
  providedIn: "root"
})
export class DeleteHabitUseCase {
  private readonly _habitRepository = inject(HabitRepository);

  execute(id: string) {
    return this._habitRepository.deleteHabit(id);
  }
}
