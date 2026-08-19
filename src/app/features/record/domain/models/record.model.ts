export type DayState = "not-scheduled" | "pending" | "missed" | "completed";

export interface DayCell {
  key: Date[];
  label: string;
  isToday: boolean;
  state: DayState;
}
