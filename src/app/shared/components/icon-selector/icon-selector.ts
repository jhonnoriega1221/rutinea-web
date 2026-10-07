import { Component, computed, model, signal } from "@angular/core";
import { FormValueControl } from "@angular/forms/signals";
import { getIconByKey, HABIT_ICON_OPTIONS, IconOption } from "../icons/habit-icons";
import { HlmPopoverImports } from "@spartan-ng/helm/popover";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { NgIcon } from "@ng-icons/core";

@Component({
  selector: "app-icon-selector",
  imports: [HlmPopoverImports, HlmButtonImports, NgIcon],
  templateUrl: "./icon-selector.html"
})
export class IconSelector implements FormValueControl<string> {
  readonly value = model(HABIT_ICON_OPTIONS[0].key);
  protected readonly iconSelected = computed<IconOption>(() => {
    return getIconByKey(this.value()) ?? HABIT_ICON_OPTIONS[0];
  });

  protected readonly state = signal<"open" | "closed">("closed");
  protected readonly uiIcons = computed(() => {
    const selectedKey = this.value();

    return HABIT_ICON_OPTIONS.map((icon) => {
      const isSelected = icon.key === selectedKey;

      const stateClasses = isSelected
        ? "bg-primary/20 hover:bg-primary/20 text-primary"
        : "bg-transparent hover:bg-foreground/10 text-foreground";

      return {
        ...icon,
        uiClasses: stateClasses
      };
    });
  });

  protected select(iconSelected: IconOption) {
    this.value.set(iconSelected.key);
    this.state.set("closed");
  }
}
