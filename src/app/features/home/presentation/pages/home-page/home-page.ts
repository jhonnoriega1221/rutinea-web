import { Component, inject, OnInit } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HomeGreeting } from "../../components/home-greeting/home-greeting";
import { HlmCardImports } from "@spartan-ng/helm/card";
import { KpiPanel } from "../../components/kpi-panel/kpi-panel";
import { DailyHabitsPanel } from "../../components/daily-habits-panel/daily-habits-panel";
import { HabitsFacade } from "../../../../habits/presentation/facade/habits.facade";
import { HabitLogsFacade } from "../../../../habits/presentation/facade/habit-logs.facade";
import { CreateHabitLogFormModel } from "../../../../habits/domain/models/habit-log.model";

@Component({
  selector: "app-home-page",
  imports: [HlmButtonImports, HomeGreeting, HlmCardImports, KpiPanel, DailyHabitsPanel],
  standalone: true,
  templateUrl: "./home-page.html",
  styleUrl: "./home-page.css"
})
export class HomePage implements OnInit {
  private readonly _habitsFacade = inject(HabitsFacade);
  private readonly _habitLogsFacade = inject(HabitLogsFacade);

  readonly habits = this._habitsFacade.habits;
  readonly habitLogs = this._habitLogsFacade.listLogsMap;

  async ngOnInit() {
    await this._habitsFacade.loadAll();

    const habitIds = this._habitsFacade.habits().map((h) => h.id);
    if (habitIds.length > 0) {
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 29);

      await this._habitLogsFacade.loadLogsForHabitsList(habitIds, thirtyDaysAgo, today);
    }
  }

  async onCompleteHabit(habitLog: { habitId: string; logDateKey: string; isCompleted: boolean }) {
    console.log(habitLog.isCompleted);
    if (!habitLog.isCompleted) {
      await this._habitLogsFacade.create({ habitId: habitLog.habitId, date: habitLog.logDateKey });
    } else {
      await this._habitLogsFacade.delete(habitLog.habitId, habitLog.logDateKey);
    }
  }
}
