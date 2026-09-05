import { inject, Injectable } from "@angular/core";
import { CreateHabitLogUseCase } from "../../domain/usecases/create-habit-log.use-case";
import { DeleteHabitLogUseCase } from "../../domain/usecases/delete-habit-log.use-case";
import { CreateHabitLogFormModel } from "../../domain/models/habit-log.model";

@Injectable({
  providedIn: "root"
})
export class HabitLogsFacade {
  private _createHabitLog = inject(CreateHabitLogUseCase);
  private _deleteHabitLog = inject(DeleteHabitLogUseCase);

  async create(data: CreateHabitLogFormModel) {
    const habitLog = await this._createHabitLog.execute(data);
    //this._habits.update((current) => [...current, habit]);
    return habitLog;
  }

  async delete(id: string) {
    await this._deleteHabitLog.execute(id);

    //this._habits.update((current) => current.filter((h) => h.id !== id));
  }
}
