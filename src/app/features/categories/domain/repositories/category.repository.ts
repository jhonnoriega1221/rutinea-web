import { Category } from "../models/category.model";

export abstract class CategoryRepository {
  abstract createCategory(Category: Category): Promise<Category>;
  abstract getCategories(): Promise<Category[]>;
  abstract getCategoryById(id: string): Promise<Category>;
  abstract updateCategory(Category: Category): Promise<Category>;
  abstract deleteCategory(id: string): Promise<void>;
}
