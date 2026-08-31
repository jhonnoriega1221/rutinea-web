import { ChangeDetectionStrategy, Component, effect, input, output, signal } from "@angular/core";
import { HlmFieldImports } from "@spartan-ng/helm/field";
import { HlmInputImports } from "@spartan-ng/helm/input";
import { HlmTextareaImports } from "@spartan-ng/helm/textarea";
import { HlmToggleGroupImports } from "@spartan-ng/helm/toggle-group";
import { HlmSelectImports } from "@spartan-ng/helm/select";
import { form, FormRoot, maxLength, minLength, required, FormField } from "@angular/forms/signals";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { IconSelector } from "../../../../../shared/components/icon-selector/icon-selector";
import { CreateHabitFormModel, Habit, WEEK_DAYS } from "../../../domain/models/habit.model";

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
  habitToEdit = input<Habit | undefined>(undefined);

  submitted = output<CreateHabitFormModel>();

  readonly weekdayOptions = WEEK_DAYS;

  itemToString = (value: string): string => {
    if (value === "none") {
      return "No category";
    }

    return value;
  };

  protected readonly _createHabitFormModel = signal<CreateHabitFormModel>({
    name: "",
    description: "",
    categoryId: "none",
    frequency: [],
    icon: "leaf"
  });

  constructor() {
    effect(() => {
      const habit = this.habitToEdit();
      if (habit) {
        this._createHabitFormModel.set({
          name: habit.name,
          description: habit.description,
          categoryId: habit.categoryId,
          frequency: habit.frequency,
          icon: habit.icon
        });
      }
    });
  }

  public readonly form = form(
    this._createHabitFormModel,
    (schemaPath) => {
      required(schemaPath.name, { message: "Habit name must be entered." });
      minLength(schemaPath.name, 5, { message: "Habit name must be at least 5 characters." });
      maxLength(schemaPath.name, 100, { message: "Habit cannot exceed 100 characters." });

      maxLength(schemaPath.description, 300, { message: "Habit cannot exceed 300 characters." });

      required(schemaPath.icon, { message: "Habit icon must be selected." });
      required(schemaPath.frequency, { message: "At least one day must be selected." });
    },
    {
      submission: {
        action: async () => {
          const model = this._createHabitFormModel();
          this.submitted.emit(model);
        }
      }
    }
  );
}
