import { Component, output } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HlmToggleGroupImports } from "@spartan-ng/helm/toggle-group";
import { NgIcon } from "@ng-icons/core";

@Component({
  selector: "app-categories-list",
  imports: [HlmToggleGroupImports, HlmButtonImports, NgIcon],
  templateUrl: "./categories-list.html",
  styleUrl: "./categories-list.css"
})
export class CategoriesList {
  clickedCreateCategory = output<void>();
}
