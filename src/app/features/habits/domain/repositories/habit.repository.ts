import { Habit } from "../models/habit.model";

export abstract class HabitRepository {
  abstract createHabit(habit: Habit): Promise<Habit>;
  abstract getHabits(): Promise<Habit[]>;
  abstract getHabitById(id: string): Promise<Habit>;
  abstract updateHabit(habit: Habit): Promise<Habit>;
  abstract deleteHabit(id: string): Promise<void>;
}
