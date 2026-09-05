import { inject, Injectable } from "@angular/core";
import { HabitLogRepository } from "../repositories/habit-log.repository";
import { CreateHabitLogFormModel, HabitLog } from "../models/habit-log.model";

@Injectable({
  providedIn: "root"
})
export class CreateHabitLogUseCase {
  private readonly _repository = inject(HabitLogRepository);

  execute(data: CreateHabitLogFormModel) {
    const log: HabitLog = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return this._repository.createHabitLog(log);
  }
}
