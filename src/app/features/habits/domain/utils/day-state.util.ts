import { DayState } from "../models/habit-log.model";
import { Weekday, WEEKDAYS } from "../models/habit.model";

interface ResolveDayStateOptions {
  date: Date;
  scheduled: Set<Weekday>;
  completed: boolean;
  createdAt?: Date;
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
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().split("T")[0];
}

export function resolveDayState(options: ResolveDayStateOptions): DayState {
  const {
    date,
    scheduled,
    completed,
    createdAt,
    urgentThresholdHours,
    hideFuture = false
  } = options;

  const today = new Date();

  if (hideFuture && toDateKey(date) > toDateKey(today)) return "future-date";
  if (completed) return "completed";
  if (createdAt && toDateKey(createdAt) > toDateKey(date)) return "not-scheduled";
  if (!scheduled.has(getWeekdayKey(date))) return "not-scheduled";

  const dateKey = toDateKey(date);

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

export function completionsThisWeek(completedDates: Set<string>, weekStartsOn: 0 | 1 = 0) {
  const completed = completedDates;
  if (!completed || completed.size === 0) return 0;

  const weekDates = getWeekDates(new Date(), weekStartsOn);

  return weekDates.reduce((count, date) => {
    const key = toDateKey(date);
    return completed.has(key) ? count + 1 : count;
  }, 0);
}
