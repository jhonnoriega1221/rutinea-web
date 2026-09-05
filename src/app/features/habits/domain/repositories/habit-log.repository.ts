import { HabitLog } from "../models/habit-log.model";

export abstract class HabitLogRepository {
  abstract createHabitLog(log: HabitLog): Promise<HabitLog>;
  abstract deleteHabitLog(id: string): Promise<void>;
  /*   abstract getLogByHabitAndDate(habitId: string, date: string): Promise<HabitLog | undefined>;
  abstract getLogsByHabitAndDateRange(
    habitId: string,
    startDate: Date,
    endDate: Date
  ): Promise<HabitLog[]>;
  abstract getLogsByDateRange(startDate: Date, endDate: string): Promise<HabitLog[]>; */
}
