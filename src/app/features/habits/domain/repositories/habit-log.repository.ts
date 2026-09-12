import { HabitLog } from "../models/habit-log.model";

export abstract class HabitLogRepository {
  abstract createHabitLog(log: HabitLog): Promise<HabitLog>;
  abstract deleteHabitLog(id: string): Promise<void>;
  abstract getLogByHabitAndDate(habitId: string, dateKey: string): Promise<HabitLog | undefined>;
  abstract getLogsByHabitAndDateRange(
    habitId: string,
    startDateKey: string,
    endDateKey: string
  ): Promise<HabitLog[]>;
  abstract getLogsByHabitsAndDateRange(
    habitIds: string[],
    startDate: string,
    endDate: string
  ): Promise<HabitLog[]>;
  //abstract getLogsByDateRange(startDate: string, endDate: string): Promise<HabitLog[]>;
}
