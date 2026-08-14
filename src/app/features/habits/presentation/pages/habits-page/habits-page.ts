import { Component, inject, OnInit, signal, viewChild } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { ResponsiveDialogSheet } from "../../../../../shared/components/responsive-dialog-sheet/responsive-dialog-sheet";
import { lucidePlus } from "@ng-icons/lucide";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { HabitsCreateForm } from "../../components/habits-create-form/habits-create-form";
import { CreateHabitUseCase } from "../../../domain/usecases/create-habit.use-case";
import { CreateHabitFormModel } from "../../../domain/models/habit.model";
import { HabitsList } from "../../components/habits-list/habits-list";
import { HabitsFacade } from "../../facade/habits.facade";
@Component({
  selector: "app-habits-page",
  imports: [HlmButtonImports, NgIcon, ResponsiveDialogSheet, HabitsCreateForm, HabitsList],
  templateUrl: "./habits-page.html",
  styleUrl: "./habits-page.css",
  viewProviders: [provideIcons({ lucidePlus })]
})
export class HabitsPage implements OnInit {
  private readonly _habitsFacade = inject(HabitsFacade);

  protected readonly habits = this._habitsFacade.habits;
  protected readonly isLoading = this._habitsFacade.isLoading;
  protected readonly createDialog = viewChild.required<ResponsiveDialogSheet>("createDialog");

  async ngOnInit() {
    await this._habitsFacade.loadAll();
  }

  protected async onHabitSubmitted(model: CreateHabitFormModel): Promise<void> {
    await this._habitsFacade.create(model);
    this.createDialog().close();
  }
}
