import { Weekday } from "../../domain/models/habit.model";

export interface HabitDetailsViewModel {
  id: string;
  name: string;
  description: string;
  icon: string;
  createdAt: Date;
  categoryInfo: {
    name: string;
    color: string;
  } | null;
  frequencyData: {
    type: "everyday" | "specific_days" | "days_per_week"; // TODO: Crear constantes para estos tipos
    days: Set<Weekday>;
    count: number;
  };
}
