import { Component } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HomeGreeting } from "../../components/home-greeting/home-greeting";
import { HlmCardImports } from "@spartan-ng/helm/card";
import { KpiPanel } from "../../components/kpi-panel/kpi-panel";
import { DailyHabitsPanel } from "../../components/daily-habits-panel/daily-habits-panel";

@Component({
  selector: "app-home-page",
  imports: [HlmButtonImports, HomeGreeting, HlmCardImports, KpiPanel, DailyHabitsPanel],
  standalone: true,
  templateUrl: "./home-page.html",
  styleUrl: "./home-page.css"
})
export class HomePage {}
