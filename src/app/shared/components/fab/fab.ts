import { Component, input, output } from "@angular/core";
import { NgIcon } from "@ng-icons/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { Ripple } from "../../directives/ripple.directive";
@Component({
  selector: "app-fab",
  imports: [HlmButtonImports, NgIcon, Ripple],
  templateUrl: "./fab.html"
})
export class Fab {
  readonly icon = input<string>();
  readonly click = output<void>();
}
