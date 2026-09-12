import { inject, Injectable } from "@angular/core";
import { HabitLogRepository } from "../repositories/habit-log.repository";

@Injectable({
  providedIn: "root"
})
export class GetWeeklyLogsByHabits {
  private readonly _repository = inject(HabitLogRepository);

  execute(habitIds: string[], startDateKey: string, endDateKey: string) {
    return this._repository.getLogsByHabitsAndDateRange(habitIds, startDateKey, endDateKey);
  }
}
