import { Component } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { ResponsiveDialogSheet } from "../../../../../shared/components/responsive-dialog-sheet/responsive-dialog-sheet";
import { lucidePlus } from "@ng-icons/lucide";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { HabitsCreateForm } from "../../components/habits-create-form/habits-create-form";

@Component({
  selector: "app-habits-page",
  imports: [HlmButtonImports, NgIcon, ResponsiveDialogSheet, HabitsCreateForm],
  templateUrl: "./habits-page.html",
  styleUrl: "./habits-page.css",
  viewProviders: [provideIcons({ lucidePlus })]
})
export class HabitsPage {

}
