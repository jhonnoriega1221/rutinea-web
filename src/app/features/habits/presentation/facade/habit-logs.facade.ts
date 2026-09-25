import { computed, inject, Injectable, signal } from "@angular/core";
import { CreateHabitLogUseCase } from "../../domain/usecases/create-habit-log.use-case";
import { DeleteHabitLogUseCase } from "../../domain/usecases/delete-habit-log.use-case";
import { CreateHabitLogFormModel, HabitLog } from "../../domain/models/habit-log.model";
import { GetHabitLogsByHabitAndDateRangeUseCase } from "../../domain/usecases/get-habit-logs-by-habit-and-date-range.use-case";
import { GetHabitLogByHabitAndDateUseCase } from "../../domain/usecases/get-habit-log-by-habit-and-date.use-case";
import { toDateKey } from "../../domain/utils/day-state.util";
import { GetWeeklyLogsByHabits } from "../../domain/usecases/get-weekly-logs-by-habits.use-case";

type HabitLogKey = string;

function logKey(habitId: string, date: string): HabitLogKey {
  return `${habitId}::${date}`;
}

interface MonthlyQuery {
  habitId: string;
  startDateKey: string;
  endDateKey: string;
}

interface WeeklyQuery {
  habitIds: string[];
  startDateKey: string;
  endDateKey: string;
}

interface TodayQuery {
  habitId: string;
  dateKey: string;
}

@Injectable({
  providedIn: "root"
})
export class HabitLogsFacade {
  private _createHabitLog = inject(CreateHabitLogUseCase);
  private _deleteHabitLog = inject(DeleteHabitLogUseCase);
  private _getHabitLogsByHabitAndDateRange = inject(GetHabitLogsByHabitAndDateRangeUseCase);
  private _getHabitLogByHabitAndDate = inject(GetHabitLogByHabitAndDateUseCase);
  private _getWeeklyLogsByHabits = inject(GetWeeklyLogsByHabits);

  private readonly _globalLogs = signal<Map<string, HabitLog>>(new Map());

  private readonly _activeMonthQuery = signal<MonthlyQuery | null>(null);
  private readonly _activeTodayQuery = signal<TodayQuery | null>(null);

  readonly listLogsMap = computed(() => {
    const map = new Map<string, Set<string>>();
    for (const log of this._globalLogs().values()) {
      if (!map.has(log.habitId)) {
        map.set(log.habitId, new Set<string>());
      }
      map.get(log.habitId)!.add(log.date);
    }
    return map;
  });

  readonly monthlyLogs = computed(() => {
    const query = this._activeMonthQuery();
    if (!query) return [];

    const logs: HabitLog[] = [];
    for (const log of this._globalLogs().values()) {
      if (
        log.habitId === query.habitId &&
        log.date >= query.startDateKey &&
        log.date <= query.endDateKey
      ) {
        logs.push(log);
      }
    }
    return logs;
  });

  readonly todayLog = computed(() => {
    const query = this._activeTodayQuery();
    if (!query) return null;

    const key = `${query.habitId}_${query.dateKey}`;
    return this._globalLogs().get(key) ?? null;
  });

  private _updateGlobalLogs(logs: HabitLog[]) {
    this._globalLogs.update((currentLog) => {
      const newLog = new Map(currentLog);
      logs.forEach((log) => newLog.set(`${log.habitId}_${log.date}`, log));
      return newLog;
    });
  }

  async loadLogsForMonth(habitId: string, year: number, month: number) {
    const startDateKey = toDateKey(new Date(year, month - 1, 1, 0, 0, 0));
    const endDateKey = toDateKey(new Date(year, month, 0, 0, 0, 0));

    this._activeMonthQuery.set({ habitId, startDateKey, endDateKey });

    const logs = await this._getHabitLogsByHabitAndDateRange.execute(
      habitId,
      startDateKey,
      endDateKey
    );
    this._updateGlobalLogs(logs);
  }

  async checkTodayCompletion(habitId: string, todayKey: string) {
    this._activeTodayQuery.set({ habitId, dateKey: todayKey });

    const log = await this._getHabitLogByHabitAndDate.execute(habitId, todayKey);
    if (log) {
      this._updateGlobalLogs([log]);
    }
  }

  async loadLogsForHabitsList(habitIds: string[], startDate: Date, endDate: Date) {
    if (habitIds.length === 0) return;

    const startKey = toDateKey(startDate);
    const endKey = toDateKey(endDate);

    const logs = await this._getWeeklyLogsByHabits.execute(habitIds, startKey, endKey);
    this._updateGlobalLogs(logs);
  }

  async create(data: CreateHabitLogFormModel) {
    const habitLog = await this._createHabitLog.execute(data);
    this._updateGlobalLogs([habitLog]);

    return habitLog;
  }

  async delete(habitId: string, dateKey: string) {
    await this._deleteHabitLog.execute(habitId, dateKey);
    this._globalLogs.update((currentLog) => {
      const newLog = new Map(currentLog);
      newLog.delete(`${habitId}_${dateKey}`);
      return newLog;
    });
  }
}
