import { Component, input, output } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HlmToggleGroupImports } from "@spartan-ng/helm/toggle-group";
import { NgIcon } from "@ng-icons/core";
import { Category } from "../../../domain/models/category.model";
@Component({
  selector: "app-category-filter-picker",
  imports: [HlmToggleGroupImports, HlmButtonImports, NgIcon],
  templateUrl: "./category-filter-picker.html",
  styleUrl: "./category-filter-picker.css"
})
export class CategoryFilterPicker {
  categories = input.required<Category[]>();
  clickedCreateCategory = output<void>();
}
