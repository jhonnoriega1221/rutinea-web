import { inject, Injectable } from "@angular/core";
import { HabitLogRepository } from "../repositories/habit-log.repository";
import { HabitLog } from "../models/habit-log.model";

@Injectable({
  providedIn: "root"
})
export class GetHabitLogByHabitAndDateUseCase {
  private readonly _repository = inject(HabitLogRepository);

  execute(habitId: string, dateKey: string): Promise<HabitLog | undefined> {
    return this._repository.getLogByHabitAndDate(habitId, dateKey);
  }
}
