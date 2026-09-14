import { computed, inject, Injectable, signal } from "@angular/core";
import { CreateHabitLogUseCase } from "../../domain/usecases/create-habit-log.use-case";
import { DeleteHabitLogUseCase } from "../../domain/usecases/delete-habit-log.use-case";
import { CreateHabitLogFormModel, HabitLog } from "../../domain/models/habit-log.model";
import { GetHabitLogsByHabitAndDateRangeUseCase } from "../../domain/usecases/get-habit-logs-by-habit-and-date-range.use-case";
import { GetHabitLogByHabitAndDateUseCase } from "../../domain/usecases/get-habit-log-by-habit-and-date.use-case";
import { toDateKey } from "../../domain/utils/day-state.util";
import { GetWeeklyLogsByHabits } from "../../domain/usecases/get-weekly-logs-by-habits.use-case";

@Injectable({
  providedIn: "root"
})
export class HabitLogsFacade {
  private _createHabitLog = inject(CreateHabitLogUseCase);
  private _deleteHabitLog = inject(DeleteHabitLogUseCase);
  private _getHabitLogsByHabitAndDateRange = inject(GetHabitLogsByHabitAndDateRangeUseCase);
  private _getHabitLogByHabitAndDate = inject(GetHabitLogByHabitAndDateUseCase);
  private _getWeeklyLogsByHabits = inject(GetWeeklyLogsByHabits);

  private readonly _logs = signal<HabitLog[]>([]);
  readonly logs = this._logs.asReadonly();

  private readonly _listLogs = signal<HabitLog[]>([]);
  readonly listLogs = this._listLogs.asReadonly();

  private readonly _todayLog = signal<HabitLog | null>(null);
  readonly todayLog = this._todayLog.asReadonly();

  readonly listLogsMap = computed(() => {
    const map = new Map<string, Set<string>>();

    for (const log of this.listLogs()) {
      if (!map.has(log.habitId)) {
        map.set(log.habitId, new Set<string>());
      }
      map.get(log.habitId)!.add(log.date);
    }

    return map;
  });

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

  async loadLogsForHabitsList(habitIds: string[], startDate: Date, endDate: Date) {
    if (habitIds.length === 0) {
      this._listLogs.set([]);
    }

    const startKey = toDateKey(startDate);
    const endKey = toDateKey(endDate);

    const logs = await this._getWeeklyLogsByHabits.execute(habitIds, startKey, endKey);
    this._listLogs.set(logs);
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

  async delete(habitId: string, dateKey: string) {
    await this._deleteHabitLog.execute(habitId, dateKey);
    this._logs.update((current) =>
      current.filter((log) => log.habitId !== habitId || log.date !== dateKey)
    );

    // Si el log que se elimina es de hoy, actualiza tambien el log de hoy en su signal
    if (this._todayLog()?.habitId === habitId && this._todayLog()?.date === dateKey) {
      this._todayLog.set(null);
    }
  }
}
