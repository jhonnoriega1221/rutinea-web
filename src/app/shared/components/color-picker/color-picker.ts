import { Component, input, model, output } from "@angular/core";
import { CATEGORY_COLORS, ColorOption } from "./app-colors";

@Component({
  selector: "app-color-picker",
  imports: [],
  templateUrl: "./color-picker.html"
})
export class ColorPicker {
  readonly value = model(CATEGORY_COLORS[0].key);
  protected readonly colors = CATEGORY_COLORS;

  protected select(colorSelected: ColorOption) {
    this.value.set(colorSelected.key);
  }
}
