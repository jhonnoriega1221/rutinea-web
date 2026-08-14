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
        path: "habits",
        pathMatch: "full",
        loadComponent: () =>
          import("./features/habits/presentation/pages/habits-page/habits-page").then(
            (m) => m.HabitsPage
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
