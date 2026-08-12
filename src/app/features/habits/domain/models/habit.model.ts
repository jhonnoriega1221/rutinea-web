export const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export interface Habit {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  icon: string;
  status: "active" | "paused" | "archived";
  frequency: Weekday[];
  createdAt: Date;
  updatedAt: Date;
}

export type CreateHabitFormModel = Omit<Habit, "id" | "createdAt" | "updatedAt" | "status">;
