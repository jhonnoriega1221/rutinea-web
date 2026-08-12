import { Habit } from "../domain/models/habit.model";

export abstract class HabitRepository {
  abstract createHabit(habit: Habit): Promise<Habit>;
  abstract getHabits(): Promise<Habit[]>;
  // abstract getHabitById(id: string): Observable<Habit | undefined>;
  // abstract updateHabit(id: string, habit: Partial<Habit>): Observable<Habit>;
  // abstract deleteHabit(id: string): Observable<void>;
}
