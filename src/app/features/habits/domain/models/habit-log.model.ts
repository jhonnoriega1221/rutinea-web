export type DayState =
  "not-scheduled" | "pending" | "missed" | "completed" | "urgent" | "future-date";

export interface DayCell {
  key: Date[];
  label: string;
  isToday: boolean;
  state: DayState;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: Date;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}
