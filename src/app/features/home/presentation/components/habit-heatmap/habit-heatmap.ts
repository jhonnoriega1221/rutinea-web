import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  input,
  output,
  viewChild
} from "@angular/core";
import { toDateKey } from "../../../../habits/domain/utils/day-state.util";
import { DatePipe } from "@angular/common";
import { HlmTooltipImports } from "@spartan-ng/helm/tooltip";

interface HeatmapDay {
  dateKey: string;
  date: Date;
  completionCount: number;
  level: 0 | 1 | 2 | 3 | 4;
  isPadding: boolean;
}

const HEATMAP_RANGE = 200;

@Component({
  imports: [DatePipe, HlmTooltipImports],
  selector: "app-habit-heatmap",
  styleUrl: "./habit-heatmap.css",
  templateUrl: "./habit-heatmap.html",
  providers: [DatePipe]
})
export class HabitHeatmap {
  private readonly _heatmap = viewChild.required<ElementRef<HTMLElement>>("heatmap");

  readonly completionData = input<Map<string, number>>(new Map());
  readonly dayClick = output<string>();

  constructor(private datePipe: DatePipe) {
    afterNextRender(() => {
      const el = this._heatmap().nativeElement;

      el.scrollLeft = el.scrollWidth;
    });
  }

  readonly heatmapDays = computed(() => {
    const days: HeatmapDay[] = [];
    const data = this.completionData();
    const today = new Date();

    const startDay = new Date(today);
    startDay.setDate(today.getDate() - HEATMAP_RANGE);

    const paddingDays = startDay.getDay();

    for (let i = 0; i < paddingDays; i++) {
      days.push({
        isPadding: true,
        dateKey: `pad-${i}`,
        date: new Date(),
        completionCount: 0,
        level: 0
      });
    }

    for (let i = HEATMAP_RANGE; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);

      const dateKey = toDateKey(d);
      const count = data.get(dateKey) ?? 0;

      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count === 1 || count === 2) level = 1;
      else if (count === 3 || count === 4) level = 2;
      else if (count === 5 || count === 6) level = 3;
      else if (count >= 7) level = 4;

      days.push({ isPadding: false, dateKey, date: d, completionCount: count, level });
    }
    return days;
  });

  readonly monthLabels = computed(() => {
    const days = this.heatmapDays();
    const labels: { text: string; colIndex: number }[] = [];
    let currentMonth = -1;

    days.forEach((day, index) => {
      if (day.isPadding) return;

      const month = day.date.getMonth();
      if (month != currentMonth) {
        currentMonth = month;
        const colIndex = Math.floor(index / 7);
        labels.push({
          text: this.datePipe.transform(day.date, "MMM") || "",
          colIndex
        });
      }
    });
    return labels;
  });
}
