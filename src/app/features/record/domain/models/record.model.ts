export type DayState = "not-scheduled" | "pending" | "missed" | "completed";

export interface DayCell {
  key: string;
  label: string;
  state: DayState;
  isToday: boolean;
}
