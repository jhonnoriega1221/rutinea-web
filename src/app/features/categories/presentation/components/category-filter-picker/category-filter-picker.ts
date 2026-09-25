import { Component, input, output } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HlmToggleGroupImports } from "@spartan-ng/helm/toggle-group";
import { NgIcon } from "@ng-icons/core";
import { Category } from "../../../domain/models/category.model";
import { ToggleValue } from "@spartan-ng/brain/toggle-group";
@Component({
  selector: "app-category-filter-picker",
  imports: [HlmToggleGroupImports, HlmButtonImports, NgIcon],
  templateUrl: "./category-filter-picker.html",
  styleUrl: "./category-filter-picker.css"
})
export class CategoryFilterPicker {
  categories = input.required<Category[]>();
  selectedCategory = input<string | null>(null);
  changeCategory = output<string | null>();
  clickCreateCategory = output<void>();

  onChangeCategory(event: ToggleValue<string>) {
    const categorySelectedString = event?.toString()!;
    const categoryToEmit = categorySelectedString === "all" ? null : categorySelectedString;
    this.changeCategory.emit(categoryToEmit);
  }
}
