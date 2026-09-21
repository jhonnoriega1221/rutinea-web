import { inject, Injectable, signal } from "@angular/core";
import { UpsertCategoryFormModel, Category } from "../../domain/models/category.model";
import { GetCategoriesUseCase } from "../../domain/usecases/get-categories.use-case";
import { CreateCategoryUseCase } from "../../domain/usecases/create-category.use-case";
import { UpdateCategoryUseCase } from "../../domain/usecases/update-category.use-case";
import { DeleteCategoryUseCase } from "../../domain/usecases/delete-category.use-case";

@Injectable({
  providedIn: "root"
})
export class CategoriesFacade {
  private _getCategories = inject(GetCategoriesUseCase);
  private _createCategory = inject(CreateCategoryUseCase);
  private _updateCategory = inject(UpdateCategoryUseCase);
  private _deleteCategory = inject(DeleteCategoryUseCase);

  private readonly _categories = signal<Category[]>([]);
  readonly categories = this._categories.asReadonly();

  async loadAll() {
    const categoriesList = await this._getCategories.execute();
    this._categories.set(categoriesList);
  }

  async create(data: UpsertCategoryFormModel) {
    const category = await this._createCategory.execute(data);
    this._categories.update((current) => [...current, category]);
    return category;
  }

  async update(category: Category) {
    const updatedCategory = await this._updateCategory.execute(category);

    this._categories.update((current) =>
      current.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
    );
    return updatedCategory;
  }

  async delete(id: string) {
    await this._deleteCategory.execute(id);

    this._categories.update((current) => current.filter((c) => c.id !== id));
  }
}
