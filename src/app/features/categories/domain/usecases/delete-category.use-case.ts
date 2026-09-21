import { inject, Injectable } from "@angular/core";
import { CategoryRepository } from "../repositories/category.repository";

@Injectable({
  providedIn: "root"
})
export class DeleteCategoryUseCase {
  private readonly _repository = inject(CategoryRepository);

  execute(id: string) {
    return this._repository.deleteCategory(id);
  }
}
