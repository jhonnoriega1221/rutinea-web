import { Component, inject, viewChild } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { ResponsiveDialogSheet } from "../../../../../shared/components/responsive-dialog-sheet/responsive-dialog-sheet";
import { lucidePlus } from "@ng-icons/lucide";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { HabitsCreateForm } from "../../components/habits-create-form/habits-create-form";
import { CreateHabitUseCase } from "../../../domain/usecases/create-habit.use-case";
import { CreateHabitFormModel } from "../../../domain/models/habit.model";
import { HabitsList } from "../../components/habits-list/habits-list";

@Component({
  selector: "app-habits-page",
  imports: [
    HlmButtonImports,
    NgIcon,
    ResponsiveDialogSheet,
    HabitsCreateForm,
    HabitsList
  ],
  templateUrl: "./habits-page.html",
  styleUrl: "./habits-page.css",
  viewProviders: [provideIcons({ lucidePlus })]
})
export class HabitsPage {
  private readonly _createHabit = inject(CreateHabitUseCase);
  protected createDialog = viewChild.required<ResponsiveDialogSheet>("createDialog");

  protected async onHabitSubmitted(model: CreateHabitFormModel): Promise<void> {
    await this._createHabit.execute(model);
    this.createDialog().close();
  }
}
