import { Habit } from "../../domain/models/habit.model";
import { IndexedDbService } from "../../../../core/indexed-db/indexed-db.service";
import { HabitRepository } from "../../domain/repositories/habit.repository";
import { inject, Injectable } from "@angular/core";
import { HabitLogRepository } from "../../domain/repositories/habit-log.repository";
import { HabitLog } from "../../domain/models/habit-log.model";
import { StoreName } from "../../../../core/indexed-db/indexed-db.config";

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
}
