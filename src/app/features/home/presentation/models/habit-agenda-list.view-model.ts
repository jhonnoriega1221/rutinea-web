import { Habit } from "../../../habits/domain/models/habit.model";

export interface HabitAgentaList extends Habit {
  isCompleted: boolean;
}
