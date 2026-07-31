import { Habit } from "../domain/habit";
import { HabitRepository } from "./habit.repository";

export class HabitApiRepository implements HabitRepository {
  async getAll(): Promise<Habit[]> {
    // fetch /api/habits
    return [];
  }

  async getById(id: string): Promise<Habit | null> {
    return null;
  }

  async create(habit: Habit): Promise<Habit> {
    return habit;
  }

  async update(id: string, changes: Partial<Habit>): Promise<Habit> {
    return { id, ...changes } as Habit;
  }

  async delete(id: string): Promise<void> {
    // DELETE /api/habits/:id
  }
}
