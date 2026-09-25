import { Habit } from "../../domain/models/habit.model";

export interface HabitListViewModel extends Habit {
  categoryInfo: {
    name: string;
    color: string;
  } | null;
  completedDates: Set<string>;
}
