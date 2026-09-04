import { Component, computed, input, output } from "@angular/core";
import { HlmBadgeImports } from "@spartan-ng/helm/badge";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { NgIcon } from "@ng-icons/core";
import { Habit } from "../../../domain/models/habit.model";
import { DayState } from "../../../domain/models/habit-log.model";
import { resolveDayState } from "../../../domain/utils/day-state.util";

interface DayConfig {
  badgeLabel: string;
  badgeClass: string;
  icon?: string;
  description: (habitName: string) => string;
  footerHint?: string;
  buttonLabel?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  action?: "missed" | "completed";
}

@Component({
  selector: "app-habit-date-info",
  imports: [HlmBadgeImports, HlmButtonImports, NgIcon],
  templateUrl: "./habit-date-info.html",
  styleUrl: "./habit-date-info.css"
})
export class HabitDateInfo {
  habit = input.required<Habit>();
  dateSelected = input.required<Date>();
  completedDates = input<string[]>();
  markCompleted = output<Date>();
  markMissed = output<Date>();

  protected readonly dayNumber = computed(() => this.dateSelected().getDate());

  protected readonly monthLabel = computed(() =>
    this.dateSelected().toLocaleDateString("en-US", { month: "short" })
  );

  protected readonly status = computed<DayState>(() => {
    const date = this.dateSelected();
    const habit = this.habit();

    return resolveDayState({
      date,
      scheduled: new Set(habit.frequency),
      completed: new Set(this.completedDates()),
      createdAt: habit.createdAt,
      hideFuture: true
    });
  });

  protected readonly config = computed<DayConfig>(() => {
    const name = this.habit().name;
    const currentStatus = this.status();

    const configs: Record<DayState, DayConfig> = {
      completed: {
        badgeLabel: "Completed",
        badgeClass: "bg-success text-white",
        icon: "lucideCheck",
        description: (n) => `You completed ${n} on this day.`,
        footerHint: "Made a mistake? You can remove this completion record.",
        buttonLabel: "Mark as missed",
        buttonVariant: "destructive",
        action: "missed"
      },
      missed: {
        badgeLabel: "Missed",
        badgeClass: "bg-destructive text-white",
        icon: "lucideX",
        description: () => "This habit was missed on this day.",
        footerHint: "Did you actually complete it? You can log it retroactively.",
        buttonLabel: "Mark as completed",
        buttonVariant: "default",
        action: "completed"
      },
      pending: {
        badgeLabel: "Pending",
        badgeClass: "bg-primary text-white",
        description: () => "This habit is scheduled for today.",
        footerHint: "Log your progress once you finish your habit.",
        buttonLabel: "Mark as completed",
        buttonVariant: "default",
        action: "completed"
      },
      "future-date": {
        badgeLabel: "Future",
        badgeClass: "bg-foreground/40 text-white",
        description: () => "Future date. You cannot register habits in advance."
      },
      "not-scheduled": {
        badgeLabel: "Not Scheduled",
        badgeClass: "bg-foreground/40 text-white",
        description: (n) => `${n} is not scheduled on this weekday.`
      },
      urgent: {
        badgeLabel: "Urgent",
        badgeClass: "bg-destructive text-white",
        description: () => "This habit is urgent and needs to be completed today.",
        footerHint: "Complete it before midnight!",
        buttonLabel: "Mark as completed",
        buttonVariant: "default",
        action: "completed"
      }
    };

    return configs[currentStatus] ?? configs["not-scheduled"];
  });
}
