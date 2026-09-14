import { inject, Injectable } from "@angular/core";
import { HabitLogRepository } from "../repositories/habit-log.repository";

@Injectable({
  providedIn: "root"
})
export class DeleteHabitLogUseCase {
  private readonly _repository = inject(HabitLogRepository);

  execute(habitId: string, dateKey: string) {
    return this._repository.deleteLogByHabitAndDate(habitId, dateKey);
  }
}
