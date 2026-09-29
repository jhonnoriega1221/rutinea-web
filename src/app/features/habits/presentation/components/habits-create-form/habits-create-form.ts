import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnInit,
  output
} from "@angular/core";
import { HlmFieldImports } from "@spartan-ng/helm/field";
import { HlmInputImports } from "@spartan-ng/helm/input";
import { HlmTextareaImports } from "@spartan-ng/helm/textarea";
import { HlmToggleGroupImports } from "@spartan-ng/helm/toggle-group";
import { HlmSelectImports } from "@spartan-ng/helm/select";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { IconSelector } from "../../../../../shared/components/icon-selector/icon-selector";
import {
  CreateHabitFormModel,
  Habit,
  HabitFrequency,
  WEEK_DAYS,
  Weekday
} from "../../../domain/models/habit.model";
import { Category } from "../../../../categories/domain/models/category.model";
import { NgIcon } from "@ng-icons/core";
import { HlmRadioGroupImports } from "@spartan-ng/helm/radio-group";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
@Component({
  selector: "app-habits-create-form",
  imports: [
    HlmButtonImports,
    HlmFieldImports,
    HlmInputImports,
    HlmTextareaImports,
    HlmToggleGroupImports,
    HlmSelectImports,
    HlmRadioGroupImports,
    ReactiveFormsModule,
    IconSelector,
    NgIcon
  ],
  templateUrl: "./habits-create-form.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: "./habits-create-form.css"
})
export class HabitsCreateForm implements OnInit {
  private readonly fb = inject(FormBuilder);

  habitToEdit = input<Habit | undefined>(undefined);
  categories = input.required<Category[]>();

  submitted = output<CreateHabitFormModel>();
  clickNewCategory = output<void>();

  readonly weekdayOptions = WEEK_DAYS;

  public form = this.fb.nonNullable.group({
    name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ["", [Validators.maxLength(300)]],
    categoryId: ["none"],
    icon: ["leaf", Validators.required],
    frequencyType: [
      "everyday" as "everyday" | "specific_days" | "days_per_week",
      Validators.required
    ], //TODO: Crear constantes para los tipos de frequency
    frequencyDays: [[] as Weekday[]],
    frequencyCount: [1]
  });

  constructor() {
    effect(() => {
      const habit = this.habitToEdit();
      if (habit) {
        const frequencyType = habit.frequencyData.type;
        this.form.patchValue({
          name: habit.name,
          description: habit.description,
          categoryId: habit.categoryId,
          icon: habit.icon,
          frequencyType: habit.frequencyData.type,
          frequencyDays:
            frequencyType === "specific_days" ? (habit.frequencyData.days as Weekday[]) : [],
          frequencyCount: frequencyType === "days_per_week" ? habit.frequencyData.count : 1
        });
      }
    });
  }

  ngOnInit() {
    this.form.controls.frequencyType.valueChanges.subscribe((type) => {
      const daysCtrl = this.form.controls.frequencyDays;
      const countCtrl = this.form.controls.frequencyCount;

      daysCtrl.clearValidators();
      countCtrl.clearValidators();

      if (type === "specific_days") {
        daysCtrl.setValidators(Validators.required);
      } else if (type === "days_per_week") {
        countCtrl.setValidators([Validators.required, Validators.min(1), Validators.max(7)]);
      }

      daysCtrl.updateValueAndValidity();
      countCtrl.updateValueAndValidity();
    });
  }

  itemToString = (value: string): string => {
    if (value === "none" || !value) {
      return "No category";
    }

    const category = this.categories().find((c) => c.id === value);

    return category ? category.name : value;
  };

  protected onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValues = this.form.getRawValue();
    let finalFrequency: HabitFrequency;

    switch (formValues.frequencyType) {
      case "specific_days":
        finalFrequency = { type: "specific_days", days: formValues.frequencyDays };
        break;
      case "days_per_week":
        finalFrequency = { type: "days_per_week", count: formValues.frequencyCount };
        break;
      default:
        finalFrequency = { type: "everyday" };
        break;
    }

    const model: CreateHabitFormModel = {
      name: formValues.name,
      description: formValues.description,
      categoryId: formValues.categoryId,
      icon: formValues.icon,
      frequencyData: finalFrequency
    };
    this.submitted.emit(model);
  }

  public patchCategory(categoryId: string) {
    this.form.patchValue({ categoryId });
  }
}
