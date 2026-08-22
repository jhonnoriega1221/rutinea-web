export type DayState = "not-scheduled" | "pending" | "missed" | "completed" | "urgent";

export interface DayCell {
  key: Date[];
  label: string;
  isToday: boolean;
  state: DayState;
}
