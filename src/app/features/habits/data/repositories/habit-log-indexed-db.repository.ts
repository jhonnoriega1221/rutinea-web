import { Habit } from "../../domain/models/habit.model";
import { IndexedDbService } from "../../../../core/indexed-db/indexed-db.service";
import { HabitRepository } from "../../domain/repositories/habit.repository";
import { inject, Injectable } from "@angular/core";
import { HabitLogRepository } from "../../domain/repositories/habit-log.repository";
import { HabitLog } from "../../domain/models/habit-log.model";
import { DB_CONFIG, StoreName } from "../../../../core/indexed-db/indexed-db.config";

@Injectable({
  providedIn: "root"
})
export class IndexedDbHabitLogRepository implements HabitLogRepository {
  private readonly STORE_NAME: StoreName = "habitLogs";

  private readonly _idbService = inject(IndexedDbService);

  createHabitLog(log: HabitLog): Promise<HabitLog> {
    return this._idbService.add(this.STORE_NAME, log);
  }

  deleteHabitLog(id: string): Promise<void> {
    return this._idbService.delete(this.STORE_NAME, id);
  }

  getLogByHabitAndDate(habitId: string, dateKey: string): Promise<HabitLog | undefined> {
    //TODO: crear diccionario de indexes
    return this._idbService.getOneByIndex<HabitLog>(this.STORE_NAME, "habitId_date", [
      habitId,
      dateKey
    ]);
  }

  getLogsByHabitAndDateRange(
    habitId: string,
    startDateKey: string,
    endDateKey: string
  ): Promise<HabitLog[]> {
    const range = IDBKeyRange.bound([habitId, startDateKey], [habitId, endDateKey]);

    //TODO: crear diccionario de indexes
    return this._idbService.getByIndex<HabitLog>(this.STORE_NAME, "habitId_date", range);
  }

  async getLogsByHabitsAndDateRange(
    habitIds: string[],
    startDate: string,
    endDate: string
  ): Promise<HabitLog[]> {
    if (habitIds.length === 0) return [];

    const promises = habitIds.map((id) => this.getLogsByHabitAndDateRange(id, startDate, endDate));

    const results = await Promise.all(promises);
    return results.flat();
  }
}
