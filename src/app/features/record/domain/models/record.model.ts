export type DayState =
  "not-scheduled" | "pending" | "missed" | "completed" | "urgent" | "future-date";

export interface DayCell {
  key: Date[];
  label: string;
  isToday: boolean;
  state: DayState;
}
