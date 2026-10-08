import { Component, signal } from "@angular/core";
import { CircularProgress } from "../../../../../shared/components/circular-progress/circular-progress";

@Component({
  imports: [CircularProgress],
  selector: "app-dates-horizontal-picker",
  styleUrl: "./dates-horizontal-picker.css",
  templateUrl: "./dates-horizontal-picker.html"
})
export class DatesHorizontalPicker {
  readonly list = signal<string[]>([
    "1",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2",
    "2"
  ]);
}
