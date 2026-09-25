import { Component, input, output } from "@angular/core";
import { Category } from "../../../domain/models/category.model";
import { CategoriesListItem } from "../categories-list-item/categories-list-item";

@Component({
  selector: "app-categories-list",
  imports: [CategoriesListItem],
  templateUrl: "./categories-list.html",
  styleUrl: "./categories-list.css"
})
export class CategoriesList {
  categories = input<Category[]>([]);

  clickDelete = output<string>();
  clickEdit = output<Category>();
}
