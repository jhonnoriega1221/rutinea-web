import { inject, Injectable } from "@angular/core";
import { UpsertCategoryFormModel, Category } from "../models/category.model";
import { CategoryRepository } from "../repositories/category.repository";

@Injectable({
  providedIn: "root"
})
export class CreateCategoryUseCase {
  private readonly _repository = inject(CategoryRepository);

  execute(data: UpsertCategoryFormModel) {
    const category: Category = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return this._repository.createCategory(category);
  }
}
