import { Component, computed, input, output } from "@angular/core";
import { Category } from "../../../domain/models/category.model";
import { NgIcon } from "@ng-icons/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { getColorByKey } from "../../../../../shared/components/color-picker/app-colors";

@Component({
  selector: "app-categories-list-item",
  imports: [NgIcon, HlmButtonImports],
  templateUrl: "./categories-list-item.html",
  styleUrl: "./categories-list-item.css"
})
export class CategoriesListItem {
  category = input<Category>();

  edit = output<Category>();
  delete = output<string>();

  categoryColor = computed<string>(() => getColorByKey(this.category()?.color!)?.cssVar!);
}
