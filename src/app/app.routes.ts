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
      }
    ]
  }
];
