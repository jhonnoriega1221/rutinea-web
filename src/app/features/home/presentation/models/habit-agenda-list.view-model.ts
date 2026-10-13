import { DayState } from "../../../habits/domain/models/habit-log.model";
import { Habit } from "../../../habits/domain/models/habit.model";

export interface HabitAgendaListViewModel extends Habit {
  dayState: DayState;
  categoryInfo: {
    id: string;
    name: string;
    color: string;
    cssVar: string;
  } | null;
}
