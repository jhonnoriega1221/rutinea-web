import { Component, input, output } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HlmToggleGroupImports } from "@spartan-ng/helm/toggle-group";
import { NgIcon } from "@ng-icons/core";
import { Category } from "../../../domain/models/category.model";

@Component({
  selector: "app-categories-list",
  imports: [HlmToggleGroupImports, HlmButtonImports, NgIcon],
  templateUrl: "./categories-list.html",
  styleUrl: "./categories-list.css"
})
export class CategoriesList {
  categories = input.required<Category[]>();
  clickedCreateCategory = output<void>();
}
