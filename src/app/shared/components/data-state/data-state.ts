import { Component, input, output } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";

@Component({
  imports: [HlmButtonImports],
  selector: "app-data-state",
  styleUrl: "./data-state.css",
  templateUrl: "./data-state.html"
})
export class DataState {
  image = input<string | undefined>("/assets/svg/error_state.svg");
  title = input<string | undefined>("Something went wrong");
  description = input<string | undefined>(
    "We couldn't load this right now. Please try again in a moment."
  );
  actionBtnText = input<string | undefined>();

  clickAction = output<void>();
}
