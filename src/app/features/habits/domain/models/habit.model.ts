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

export const FREQUENCY_TYPE: Record<Weekday, string> = {
  sunday: "Su",
  monday: "Mo",
  tuesday: "Tu",
  wednesday: "We",
  thursday: "Th",
  friday: "Fr",
  saturday: "Sa"
};

export type HabitFrequency =
  | { type: "everyday" }
  | { type: "specific_days"; days: Weekday[] }
  | { type: "days_per_week"; count: number };

export interface Habit {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  icon: string;
  status: "active" | "paused" | "archived";
  frequencyData: HabitFrequency;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateHabitFormModel = Omit<Habit, "id" | "createdAt" | "updatedAt" | "status">;
