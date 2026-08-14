import { inject, Injectable, signal } from "@angular/core";
import { CreateHabitFormModel, Habit } from "../../domain/models/habit.model";
import { GetHabitsUseCase } from "../../domain/usecases/get-habits.use-case";
import { CreateHabitUseCase } from "../../domain/usecases/create-habit.use-case";

@Injectable({
  providedIn: "root"
})
export class HabitsFacade {
  private _getHabits = inject(GetHabitsUseCase);
  private _createHabit = inject(CreateHabitUseCase);

  private readonly _habits = signal<Habit[]>([]);
  private readonly _isLoading = signal(false);

  readonly habits = this._habits.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  async loadAll() {
    this._isLoading.set(true);
    try {
      const habitsList = await this._getHabits.execute();
      this._habits.set(habitsList);
    } finally {
      this._isLoading.set(false);
    }
  }

  async create(data: CreateHabitFormModel): Promise<Habit> {
    const habit = await this._createHabit.execute(data);
    this._habits.update((current) => [...current, habit]);
    return habit;
  }
}
