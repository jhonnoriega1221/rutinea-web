export const WEEKDAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
] as const;

export const DAY_LABELS: Record<Weekday, string> = {
  sunday: "Su",
  monday: "Mo",
  tuesday: "Tu",
  wednesday: "We",
  thursday: "Th",
  friday: "Fr",
  saturday: "Sa"
};

export const WEEK_DAYS = WEEKDAYS.map((day) => ({
  key: day,
  label: DAY_LABELS[day]
}));

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
