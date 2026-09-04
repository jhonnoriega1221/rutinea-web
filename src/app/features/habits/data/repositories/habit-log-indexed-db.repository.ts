import { Habit } from "../../domain/models/habit.model";
import { IndexedDbService } from "../../../../core/indexed-db/indexed-db.service";
import { HabitRepository } from "../../domain/repositories/habit.repository";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class IndexedDbHabitLogRepository implements HabitRepository {
  private readonly STORE_NAME = "habits";

  private _idbService = inject(IndexedDbService);

  createHabit(habitData: Habit): Promise<Habit> {
    return this._idbService.add(this.STORE_NAME, habitData);
  }

  getHabits(): Promise<Habit[]> {
    return this._idbService.getAll<Habit>(this.STORE_NAME);
  }

  getHabitById(habitId: string): Promise<Habit> {
    return this._idbService.getById<Habit>(this.STORE_NAME, habitId);
  }

  updateHabit(habit: Habit): Promise<Habit> {
    return this._idbService.update<Habit>(this.STORE_NAME, habit);
  }

  deleteHabit(habitId: string): Promise<void> {
    return this._idbService.delete(this.STORE_NAME, habitId);
  }
}
