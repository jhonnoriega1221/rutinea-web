import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { HlmFieldImports } from "@spartan-ng/helm/field";
import { HlmInputImports } from "@spartan-ng/helm/input";
import { HlmTextareaImports } from "@spartan-ng/helm/textarea";
import { HlmToggleGroupImports } from "@spartan-ng/helm/toggle-group";
import { HlmSelectImports } from "@spartan-ng/helm/select";
import { form, FormRoot, maxLength, minLength, required, FormField } from "@angular/forms/signals";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { IconSelector } from "../../../../../shared/components/icon-selector/icon-selector";

interface CreateHabitModel {
  name: string;
  description: string;
  category: string;
  frequency: string[];
  icon: string;
}

@Component({
  selector: "app-habits-create-form",
  imports: [
    HlmButtonImports,
    HlmFieldImports,
    HlmInputImports,
    HlmTextareaImports,
    HlmToggleGroupImports,
    HlmSelectImports,
    FormRoot,
    FormField,
    IconSelector
],
  templateUrl: "./habits-create-form.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./habits-create-form.css"
})
export class HabitsCreateForm {
  protected readonly _createHabitFormModel = signal<CreateHabitModel>({
    name: "",
    description: "",
    category: "no_category",
    frequency: [],
    icon: "leaf"
  });

  public readonly form = form(
    this._createHabitFormModel,
    (schemaPath) => {
      required(schemaPath.name, { message: "Habit name must be entered." });
      minLength(schemaPath.name, 5, { message: "Habit name must be at least 5 characters." });
      maxLength(schemaPath.name, 100, { message: "Habit cannot exceed 100 characters." });

      required(schemaPath.description, { message: "Habit description must be entered." });
      maxLength(schemaPath.description, 300, { message: "Habit cannot exceed 300 characters." });

      required(schemaPath.icon, { message: "Habit icon must be selected." });
      required(schemaPath.frequency, { message: "At least one day must be selected." });
    },
    {
      submission: {
        action: async () => {
          const model = this._createHabitFormModel();
          console.log("values submitted: ", model);
        }
      }
    }
  );
}
