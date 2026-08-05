import { StoreRecord } from "../../../core/indexed-db/indexed-db.repository";

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

export interface Habit extends StoreRecord {
  name: string;
  description: string;
  categoryId: string;
  icon: string;
  status: "active" | "paused" | "archived";
  frequency: Weekday[];
  createdAt: string;
}
