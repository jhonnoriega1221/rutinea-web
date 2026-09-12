import { computed, inject, Injectable, signal } from "@angular/core";
import { CreateHabitFormModel, Habit } from "../../domain/models/habit.model";
import { GetHabitsUseCase } from "../../domain/usecases/get-habits.use-case";
import { CreateHabitUseCase } from "../../domain/usecases/create-habit.use-case";
import { GetHabitByIdUseCase } from "../../domain/usecases/get-habit-by-id.use-case";
import { UpdateHabitUseCase } from "../../domain/usecases/update-habit.use-case";
import { DeleteHabitUseCase } from "../../domain/usecases/delete-habit.use-case";

@Injectable({
  providedIn: "root"
})
export class HabitsFacade {
  private _getHabits = inject(GetHabitsUseCase);
  private _createHabit = inject(CreateHabitUseCase);
  private _getHabitById = inject(GetHabitByIdUseCase);
  private _updateHabit = inject(UpdateHabitUseCase);
  private _deleteHabit = inject(DeleteHabitUseCase);

  private readonly _selectedHabitId = signal<string | undefined>(undefined);

  private readonly _habits = signal<Habit[]>([]);
  readonly habits = this._habits.asReadonly();

  readonly selectedHabit = computed(() => {
    const habitId = this._selectedHabitId();
    if (!habitId) return undefined;
    return this._habits().find((h) => h.id === habitId);
  });

  async loadAll() {
    const habitsList = await this._getHabits.execute();
    this._habits.set(habitsList);
  }

  async create(data: CreateHabitFormModel) {
    const habit = await this._createHabit.execute(data);
    this._habits.update((current) => [...current, habit]);
    return habit;
  }

  async getById(id: string): Promise<Habit | undefined> {
    const cached = this._habits().find((h) => h.id === id);
    if (cached) {
      this._selectedHabitId.set(cached.id);
      return cached;
    }

    const habit = await this._getHabitById.execute(id);
    if (habit) {
      this._habits.update((current) => [...current, habit]);
      this._selectedHabitId.set(id);
    }
    return habit;
  }

  async update(habit: Habit) {
    const updatedHabit = await this._updateHabit.execute(habit);

    this._habits.update((current) =>
      current.map((h) => (h.id === updatedHabit.id ? updatedHabit : h))
    );
    return updatedHabit;
  }

  async delete(id: string) {
    await this._deleteHabit.execute(id);

    this._habits.update((current) => current.filter((h) => h.id !== id));
  }
}
