import { IndexedDbRepository } from "../../../core/indexed-db/indexed-db.repository";
import { Habit } from "../domain/habit";

export class HabitIndexedDbRepository extends IndexedDbRepository<Habit> {
  constructor() {
    super({
      dbName: "habit-db",
      version: 1,
      storeName: "habits"
    });
  }
}
