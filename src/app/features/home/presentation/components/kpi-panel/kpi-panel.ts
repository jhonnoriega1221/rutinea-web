import { Component, input } from "@angular/core";
import { NgIcon } from "@ng-icons/core";

@Component({
  imports: [NgIcon],
  selector: "app-kpi-panel",
  styleUrl: "./kpi-panel.css",
  templateUrl: "./kpi-panel.html"
})
export class KpiPanel {
  readonly title = input.required<string>();
  readonly value = input.required<number>();
  readonly icon = input.required<string>();
}
