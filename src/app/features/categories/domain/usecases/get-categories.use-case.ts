import { inject, Injectable } from "@angular/core";
import { CategoryRepository } from "../repositories/category.repository";

@Injectable({
  providedIn: "root"
})
export class GetCategoriesUseCase {
  private readonly _repository = inject(CategoryRepository);

  execute() {
    return this._repository.getCategories();
  }
}
