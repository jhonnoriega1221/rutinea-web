import { Category } from "../../domain/models/category.model";
import { IndexedDbService } from "../../../../core/indexed-db/indexed-db.service";
import { CategoryRepository } from "../../domain/repositories/category.repository";
import { inject, Injectable } from "@angular/core";
import { StoreName } from "../../../../core/indexed-db/indexed-db.config";

@Injectable({
  providedIn: "root"
})
export class IndexedDbCategoryRepository implements CategoryRepository {
  private readonly STORE_NAME: StoreName = "categories"; // TODO: obtener el nombre del store desde indexedDB.config.ts

  private _idbService = inject(IndexedDbService);

  createCategory(habitData: Category): Promise<Category> {
    return this._idbService.add(this.STORE_NAME, habitData);
  }

  getCategories(): Promise<Category[]> {
    return this._idbService.getAll<Category>(this.STORE_NAME);
  }

  getCategoryById(habitId: string): Promise<Category> {
    return this._idbService.getById<Category>(this.STORE_NAME, habitId);
  }

  updateCategory(habit: Category): Promise<Category> {
    return this._idbService.update<Category>(this.STORE_NAME, habit);
  }

  deleteCategory(habitId: string): Promise<void> {
    return this._idbService.delete(this.STORE_NAME, habitId);
  }
}
