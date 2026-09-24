import { ChangeDetectionStrategy, Component, effect, input, output, signal } from "@angular/core";
import { Category, UpsertCategoryFormModel } from "../../../domain/models/category.model";
import { form, FormField, FormRoot, maxLength, minLength, required } from "@angular/forms/signals";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HlmFieldImports } from "@spartan-ng/helm/field";
import { HlmInputImports } from "@spartan-ng/helm/input";
import { ColorPicker } from "../../../../../shared/components/color-picker/color-picker";

@Component({
  selector: "app-category-upsert-form",
  imports: [HlmButtonImports, HlmFieldImports, HlmInputImports, FormRoot, FormField, ColorPicker],
  templateUrl: "./category-upsert-form.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./category-upsert-form.css"
})
export class CategoryUpsertForm {
  categoryToEdit = input<Category | undefined>(undefined);

  submitted = output<UpsertCategoryFormModel>();

  protected readonly _upsertCategoryFormModel = signal<UpsertCategoryFormModel>({
    name: "",
    color: "red" //TODO: CREAR DICCIONARIO DE COLORES
  });

  constructor() {
    effect(() => {
      const category = this.categoryToEdit();
      if (category) {
        this._upsertCategoryFormModel.set({
          name: category.name,
          color: category.color
        });
      }
    });
  }

  public readonly form = form(
    this._upsertCategoryFormModel,
    (schemaPath) => {
      required(schemaPath.name, { message: "Category name must be entered." });
      minLength(schemaPath.name, 5, { message: "Category name must be at least 5 characters." });
      maxLength(schemaPath.name, 100, { message: "Category name cannot exceed 100 characters." });

      required(schemaPath.color, { message: "Category color must be selected." });
    },
    {
      submission: {
        action: async () => {
          const model = this._upsertCategoryFormModel();
          this.submitted.emit(model);
        }
      }
    }
  );
}
