import { DayState } from "../../../record/domain/models/record.model";
import { Weekday, WEEKDAYS } from "../models/habit.model";

interface ResolveDayStateOptions {
  date: Date;
  scheduled: Set<Weekday>;
  completed: Set<string>;
  createdAt?: Date;
  today?: Date;
  urgentThresholdHours?: number;
  hideFuture?: boolean;
}

export function getWeekdayKey(date: Date): Weekday {
  return WEEKDAYS[date.getDay()];
}

export function getTodayIndex(): number {
  return new Date().getDay();
}

export function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function resolveDayState(options: ResolveDayStateOptions): DayState {
  const {
    date,
    scheduled,
    completed,
    createdAt,
    today = new Date(),
    urgentThresholdHours,
    hideFuture = false
  } = options;
  if (hideFuture && toDateKey(date) > toDateKey(today)) return "future-date";
  if (createdAt && toDateKey(createdAt) > toDateKey(date)) return "not-scheduled";
  if (!scheduled.has(getWeekdayKey(date))) return "not-scheduled";

  const dateKey = toDateKey(date);
  if (completed.has(dateKey)) return "completed";

  if (urgentThresholdHours) {
    const isToday = dateKey === toDateKey(today);
    if (isToday) {
      const hoursLeft = 24 - today.getHours() - today.getMinutes() / 60;
      if (hoursLeft <= urgentThresholdHours) {
        return "urgent";
      }
      return "pending";
    }
  }

  return dateKey >= toDateKey(today) ? "pending" : "missed";
}

export function getWeekDates(reference: Date = new Date(), weekStartsOn: 0 | 1 = 0) {
  const start = new Date(reference);
  const day = start.getDay();
  const diff = weekStartsOn === 1 ? (day === 0 ? -6 : 1 - day) : -day;

  start.setDate(start.getDate() + diff);
  start.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}
