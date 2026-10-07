import { Component, inject, OnInit, signal, viewChild } from "@angular/core";
import { CategoriesList } from "../../components/categories-list/categories-list";
import { CategoriesFacade } from "../../facade/categories.facade";
import { NgIcon } from "@ng-icons/core";
import { ResponsivePopup } from "../../../../../shared/components/responsive-popup/responsive-popup";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { CategoryUpsertForm } from "../../components/category-upsert-form/category-upsert-form";
import { Category, UpsertCategoryFormModel } from "../../../domain/models/category.model";
import { toast } from "@spartan-ng/brain/sonner";
import { ResponsiveDialogService } from "../../../../../shared/services/responsive-dialog.service";
import { DataState } from "../../../../../shared/components/data-state/data-state";

@Component({
  selector: "app-categories-page",
  imports: [
    HlmButtonImports,
    ResponsivePopup,
    CategoriesList,
    NgIcon,
    CategoryUpsertForm,
    DataState
  ],
  templateUrl: "./categories-page.html",
  styleUrl: "./categories-page.css"
})
export class CategoriesPage implements OnInit {
  private readonly _dialog = inject(ResponsiveDialogService);
  protected readonly categoryToEdit = signal<Category | undefined>(undefined);

  private readonly _categoriesFacade = inject(CategoriesFacade);
  protected readonly categories = this._categoriesFacade.categories;

  protected readonly createCategoryDialog =
    viewChild.required<ResponsivePopup>("createCategoryDialog");

  async ngOnInit() {
    await this._categoriesFacade.loadAll();
  }

  protected async onDeleteCategory(categoryId: string) {
    const confirmDelete = await this._dialog.open({
      type: "error",
      title: "Do you want to delete this category?",
      message: "This action cannot be undone.",
      confirmButtonLabel: "Delete category",
      cancelButtonLabel: "Cancel"
    });

    if (confirmDelete) {
      this.confirmDeleteCategory(categoryId);
    }
  }

  protected async confirmDeleteCategory(categoryId: string) {
    await this._categoriesFacade.delete(categoryId);
    toast.success("Category has been deleted succefully");
  }

  protected onEditCategory(category: Category) {
    this.categoryToEdit.set(category);
    this.createCategoryDialog().open();
  }

  protected onCloseCategoryForm() {
    this.categoryToEdit.set(undefined);
  }

  protected async onCategorySubmitted(model: UpsertCategoryFormModel): Promise<void> {
    if (this.categoryToEdit()) {
      const updateCategory = {
        ...this.categoryToEdit()!,
        ...model
      };
      await this._categoriesFacade.update(updateCategory);
      toast.success("Category has been updated");
    } else {
      await this._categoriesFacade.create(model);
      toast.success("Category has been created");
    }

    this.createCategoryDialog().close();
  }
}
