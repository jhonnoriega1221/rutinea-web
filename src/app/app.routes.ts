import { Routes } from "@angular/router";
import { MainLayout } from "./layouts/main-layout/main-layout";

export const routes: Routes = [
  {
    path: "",
    component: MainLayout,
    children: [
      {
        path: "",
        pathMatch: "full",
        loadComponent: () =>
          import("./features/home/presentation/pages/home-page/home-page").then((m) => m.HomePage)
      },
      {
        path: "settings",
        pathMatch: "full",
        loadComponent: () =>
          import("./features/settings/presentation/pages/settings-page/settings-page").then(
            (m) => m.SettingsPage
          )
      },
      {
        path: "settings/categories",
        pathMatch: "full",
        loadComponent: () =>
          import("./features/categories/presentation/pages/categories-page/categories-page").then(
            (m) => m.CategoriesPage
          )
      },
      {
        path: "settings/habits",
        pathMatch: "full",
        loadComponent: () =>
          import("./features/habits/presentation/pages/habits-page/habits-page").then(
            (m) => m.HabitsPage
          )
      },
      {
        path: "agenda",
        pathMatch: "full",
        loadComponent: () =>
          import("./features/agenda/presentation/pages/agenda-page/agenda-page").then(
            (m) => m.AgendaPage
          )
      },
      {
        path: "habits/:id",
        pathMatch: "full",
        loadComponent: () =>
          import("./features/habits/presentation/pages/habits-details-page/habits-details-page").then(
            (m) => m.HabitsDetailsPage
          )
      }
    ]
  }
];
