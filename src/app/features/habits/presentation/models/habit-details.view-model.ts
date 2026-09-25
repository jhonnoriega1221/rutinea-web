import { Weekday } from "../../domain/models/habit.model";

export interface HabitDetailsViewModel {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  icon: string;
  frequency: Set<Weekday>;
  categoryInfo: {
    name: string;
    color: string;
  } | null;
}
