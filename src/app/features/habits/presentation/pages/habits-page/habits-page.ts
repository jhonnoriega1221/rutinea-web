import { Component, inject, OnInit, signal, viewChild } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { ResponsivePopup } from "../../../../../shared/components/responsive-popup/responsive-popup";
import { lucidePlus } from "@ng-icons/lucide";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { HabitsCreateForm } from "../../components/habits-create-form/habits-create-form";
import { CreateHabitFormModel } from "../../../domain/models/habit.model";
import { HabitsList } from "../../components/habits-list/habits-list";
import { HabitsFacade } from "../../facade/habits.facade";
import { toast } from "@spartan-ng/brain/sonner";
import { HabitLogsFacade } from "../../facade/habit-logs.facade";
import { getWeekDates, toDateKey } from "../../../domain/utils/day-state.util";
import { CategoriesList } from "../../../../categories/presentation/components/categories-list/categories-list";
import { CategoryUpsertForm } from "../../../../categories/presentation/components/category-upsert-form/category-upsert-form";
import { CategoriesFacade } from "../../../../categories/presentation/facade/categories.facade";
import { UpsertCategoryFormModel } from "../../../../categories/domain/models/category.model";
@Component({
  selector: "app-habits-page",
  imports: [
    HlmButtonImports,
    NgIcon,
    ResponsivePopup,
    HabitsCreateForm,
    HabitsList,
    ResponsivePopup,
    CategoriesList,
    CategoryUpsertForm
  ],
  templateUrl: "./habits-page.html",
  styleUrl: "./habits-page.css",
  viewProviders: [provideIcons({ lucidePlus })]
})
export class HabitsPage implements OnInit {
  private readonly _habitsFacade = inject(HabitsFacade);
  private readonly _habitlogsFacade = inject(HabitLogsFacade);

  private readonly _categoriesFacade = inject(CategoriesFacade);

  protected readonly habits = this._habitsFacade.habits;
  protected readonly categories = this._categoriesFacade.categories;
  protected readonly logsMap = this._habitlogsFacade.listLogsMap;

  protected readonly createHabitDialog = viewChild.required<ResponsivePopup>("createHabitDialog");
  protected readonly createHabitForm = viewChild<HabitsCreateForm>("createHabitForm");

  protected readonly createCategoryDialog =
    viewChild.required<ResponsivePopup>("createCategoryDialog");

  async ngOnInit() {
    await this._habitsFacade.loadAll();
    await this._categoriesFacade.loadAll();

    const currentHabitsIds = this.habits().map((h) => h.id);

    const weekDays = getWeekDates(new Date());
    await this._habitlogsFacade.loadLogsForHabitsList(currentHabitsIds, weekDays[0], weekDays[6]);
  }

  protected async onHabitSubmitted(model: CreateHabitFormModel): Promise<void> {
    await this._habitsFacade.create(model);
    toast.success("Habit has been created");
    this.createHabitDialog().close();
  }

  protected async onCategorySubmitted(model: UpsertCategoryFormModel): Promise<void> {
    const newCategory = await this._categoriesFacade.create(model);
    toast.success("Category has been created");

    this.createCategoryDialog().close();

    if (newCategory && newCategory.id) {
      const formRef = this.createHabitForm();
      if (formRef) {
        formRef.patchCategory(newCategory.id);
      }
    }
  }
}
