import { Component, computed, inject, OnInit, signal, viewChild } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { ResponsivePopup } from "../../../../../shared/components/responsive-popup/responsive-popup";
import { lucidePlus } from "@ng-icons/lucide";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { HabitsCreateForm } from "../../components/habits-create-form/habits-create-form";
import { CreateHabitFormModel, Weekday } from "../../../domain/models/habit.model";
import { HabitsList } from "../../components/habits-list/habits-list";
import { HabitsFacade } from "../../facade/habits.facade";
import { toast } from "@spartan-ng/brain/sonner";
import { HabitLogsFacade } from "../../facade/habit-logs.facade";
import { getWeekDates } from "../../../domain/utils/day-state.util";
import { CategoryUpsertForm } from "../../../../categories/presentation/components/category-upsert-form/category-upsert-form";
import { CategoriesFacade } from "../../../../categories/presentation/facade/categories.facade";
import { UpsertCategoryFormModel } from "../../../../categories/domain/models/category.model";
import { HlmDropdownMenuImports } from "@spartan-ng/helm/dropdown-menu";
import { RouterLink } from "@angular/router";
import { CategoryFilterPicker } from "../../../../categories/presentation/components/category-filter-picker/category-filter-picker";
import { HabitListFilters, HabitListViewModel } from "../../models/habit-list.view-model";
@Component({
  selector: "app-habits-page",
  imports: [
    HlmButtonImports,
    HlmDropdownMenuImports,
    NgIcon,
    ResponsivePopup,
    HabitsCreateForm,
    HabitsList,
    ResponsivePopup,
    CategoryUpsertForm,
    RouterLink,
    CategoryFilterPicker
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
  protected readonly logsMap = this._habitlogsFacade.listLogsMap;
  protected readonly categories = this._categoriesFacade.categories;

  protected readonly createHabitDialog = viewChild.required<ResponsivePopup>("createHabitDialog");
  protected readonly createCategoryDialog =
    viewChild.required<ResponsivePopup>("createCategoryDialog");
  protected readonly createHabitForm = viewChild<HabitsCreateForm>("createHabitForm");

  protected readonly filters = signal<HabitListFilters>({
    categoryId: null
  });

  //TODO: Mover esto a un mapper
  protected readonly habitsViewModel = computed<HabitListViewModel[]>(() => {
    const habits = this.habits();
    const categories = this.categories();
    const logsMap = this.logsMap();

    return habits.map((habit) => {
      const category = categories.find((c) => c.id === habit.categoryId);

      const completedDates = logsMap.get(habit.id) ?? new Set<string>();

      const frequencyType = habit.frequencyData.type;

      const trackableDays =
        frequencyType === "specific_days"
          ? new Set<Weekday>(habit.frequencyData.days)
          : new Set<Weekday>([
              "sunday",
              "monday",
              "thursday",
              "wednesday",
              "tuesday",
              "friday",
              "saturday"
            ]);
      const weeklyGoal = frequencyType === "days_per_week" ? habit.frequencyData.count : 7;

      return {
        ...habit,
        categoryInfo: category
          ? {
              id: habit.categoryId,
              name: category.name,
              color: category.color
            }
          : null,
        completedDates,
        frequencyData: {
          type: frequencyType,
          count: weeklyGoal,
          days: trackableDays
        }
      };
    });
  });

  protected readonly filteredHabits = computed<HabitListViewModel[]>(() => {
    const allHabits = this.habitsViewModel();
    const currentFilters = this.filters();

    return allHabits.filter((habit) => {
      if (currentFilters.categoryId && habit.categoryInfo?.id !== currentFilters.categoryId) {
        return false;
      }

      return true;
    });
  });

  onCategoryFilterChange(categoryId: string | null) {
    this.filters.update((state) => ({
      ...state,
      categoryId
    }));
  }

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
