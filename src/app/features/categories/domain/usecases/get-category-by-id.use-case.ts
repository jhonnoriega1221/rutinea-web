import { inject, Injectable } from "@angular/core";
import { CategoryRepository } from "../repositories/category.repository";

@Injectable({
  providedIn: "root"
})
export class GetCategoryByIdUseCase {
  private readonly _repository = inject(CategoryRepository);

  execute(id: string) {
    return this._repository.getCategoryById(id);
  }
}
