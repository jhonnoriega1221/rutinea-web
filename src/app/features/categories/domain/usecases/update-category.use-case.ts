import { inject, Injectable } from "@angular/core";
import { Category } from "../models/category.model";
import { CategoryRepository } from "../repositories/category.repository";

@Injectable({
  providedIn: "root"
})
export class UpdateCategoryUseCase {
  private readonly _repository = inject(CategoryRepository);

  execute(data: Category) {
    const category: Category = {
      ...data,
      updatedAt: new Date()
    };
    return this._repository.updateCategory(category);
  }
}
