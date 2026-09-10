import { inject, Injectable, signal } from "@angular/core";
import { CreateHabitLogUseCase } from "../../domain/usecases/create-habit-log.use-case";
import { DeleteHabitLogUseCase } from "../../domain/usecases/delete-habit-log.use-case";
import { CreateHabitLogFormModel, HabitLog } from "../../domain/models/habit-log.model";
import { GetHabitLogsByHabitAndDateRangeUseCase } from "../../domain/usecases/get-habit-logs-by-habit-and-date-range.use-case";
import { GetHabitLogByHabitAndDateUseCase } from "../../domain/usecases/get-habit-log-by-habit-and-date.use-case";
import { toDateKey } from "../../domain/utils/day-state.util";

@Injectable({
  providedIn: "root"
})
export class HabitLogsFacade {
  private _createHabitLog = inject(CreateHabitLogUseCase);
  private _deleteHabitLog = inject(DeleteHabitLogUseCase);
  private _getHabitLogsByHabitAndDateRange = inject(GetHabitLogsByHabitAndDateRangeUseCase);
  private _getHabitLogByHabitAndDate = inject(GetHabitLogByHabitAndDateUseCase);

  private readonly _logs = signal<HabitLog[]>([]);
  readonly logs = this._logs.asReadonly();

  private readonly _todayLog = signal<HabitLog | null>(null);
  readonly todayLog = this._todayLog.asReadonly();

  async loadLogsForMonth(habitId: string, year: number, month: number) {
    const startDate = toDateKey(new Date(year, month - 1, 1, 0, 0, 0));
    const lastDate = toDateKey(new Date(year, month, 0, 0, 0, 0));

    const logs = await this._getHabitLogsByHabitAndDateRange.execute(habitId, startDate, lastDate);
    this._logs.set(logs);
  }

  async checkTodayCompletion(habitId: string, todayKey: string) {
    const log = await this._getHabitLogByHabitAndDate.execute(habitId, todayKey);
    this._todayLog.set(log ?? null);
  }

  async create(data: CreateHabitLogFormModel) {
    const habitLog = await this._createHabitLog.execute(data);
    this._logs.update((current) => [...current, habitLog]);

    // Si el log que se crea es de hoy, actualiza tambien el log de hoy en su signal
    const habitDateKey = habitLog.date;
    const todayDateKey = toDateKey(new Date());

    if (habitDateKey === todayDateKey) {
      this._todayLog.set(habitLog);
    }

    return habitLog;
  }

  async delete(id: string) {
    await this._deleteHabitLog.execute(id);
    this._logs.update((current) => current.filter((h) => h.id !== id));

    // Si el log que se elimina es de hoy, actualiza tambien el log de hoy en su signal
    if (this._todayLog()?.id === id) {
      this._todayLog.set(null);
    }
  }
}
