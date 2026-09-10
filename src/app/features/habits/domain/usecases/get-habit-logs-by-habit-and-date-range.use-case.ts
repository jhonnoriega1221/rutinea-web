import { inject, Injectable } from "@angular/core";
import { HabitLogRepository } from "../repositories/habit-log.repository";
import { HabitLog } from "../models/habit-log.model";

@Injectable({
  providedIn: "root"
})
export class GetHabitLogsByHabitAndDateRangeUseCase {
  private readonly _repository = inject(HabitLogRepository);

  execute(habitId: string, startDateKey: string, endDateKey: string): Promise<HabitLog[]> {
    return this._repository.getLogsByHabitAndDateRange(habitId, startDateKey, endDateKey);
  }
}
