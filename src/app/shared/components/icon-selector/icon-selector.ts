import { Component, model, signal } from "@angular/core";
import { FormValueControl } from "@angular/forms/signals";
import { HABIT_ICON_OPTIONS, IconOption } from "../icons/habit-icons";
import { HlmPopoverImports } from "@spartan-ng/helm/popover";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { NgIcon } from "@ng-icons/core";

@Component({
  selector: "app-icon-selector",
  imports: [HlmPopoverImports, HlmButtonImports, NgIcon],
  templateUrl: "./icon-selector.html",
  styleUrl: "./icon-selector.css"
})
export class IconSelector implements FormValueControl<string> {
  readonly value = model("leaf");
  readonly iconSelected = signal("lucideLeaf");

  protected readonly state = signal<"open" | "closed">("closed");
  protected readonly icons = HABIT_ICON_OPTIONS;

  protected select(iconSelected: IconOption) {
    this.value.set(iconSelected.key);
    this.iconSelected.set(iconSelected.icon);
    this.state.set("closed");
  }
}
