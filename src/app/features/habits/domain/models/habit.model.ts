export const WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
] as const;

export const DAY_LABELS: Record<Weekday, string> = {
  monday: "M",
  tuesday: "T",
  wednesday: "W",
  thursday: "Th",
  friday: "F",
  saturday: "S",
  sunday: "Su"
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
