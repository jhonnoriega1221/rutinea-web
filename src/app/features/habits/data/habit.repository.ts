import { Habit } from "../domain/models/habit.model";

export abstract class HabitRepository {
  abstract createHabit(habit: Habit): Promise<Habit>;
  abstract getHabits(): Promise<Habit[]>;
  abstract getHabitById(id: string): Promise<Habit>;
  // abstract updateHabit(id: string, habit: Partial<Habit>): Observable<Habit>;
  // abstract deleteHabit(id: string): Observable<void>;
}
