import { Habit } from "../domain/habit";

export interface HabitRepository {
  getAll(): Promise<Habit[]>;
  getById(id: string): Promise<Habit | null>;
  create(habit: Habit): Promise<Habit>;
  update(id: string, changes: Partial<Habit>): Promise<Habit>;
  delete(id: string): Promise<void>;
}
