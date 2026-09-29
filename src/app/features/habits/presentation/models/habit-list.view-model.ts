import { Habit, Weekday } from "../../domain/models/habit.model";

export interface HabitListViewModel {
  id: string;
  name: string;
  icon: string;
  createdAt: Date;
  completedDates: Set<string>;
  categoryInfo: {
    id: string;
    name: string;
    color: string;
  } | null;
  frequencyData: {
    type: "everyday" | "specific_days" | "days_per_week"; // TODO: Crear constantes para estos tipos
    days: Set<Weekday>;
    count: number;
  };
}

export interface HabitListFilters {
  categoryId: string | null;
}
