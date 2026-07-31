import { StoreRecord } from "../../../core/indexed-db/indexed-db.repository";

export interface Habit extends StoreRecord {
  name: string;
  description: string;
  categoryId: string;
  icon: string;
  status: "active" | "paused" | "archived";
  frequency: {
    type: "daily" | "weekly";
    days?: string[];
  };
  streak: number;
}
