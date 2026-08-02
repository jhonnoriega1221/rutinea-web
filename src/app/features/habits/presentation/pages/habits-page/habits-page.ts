import { Component } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { ResponsiveDialogSheet } from "../../../../../shared/components/responsive-dialog-sheet/responsive-dialog-sheet";
import { lucidePlus } from "@ng-icons/lucide";
import { NgIcon, provideIcons } from "@ng-icons/core";

@Component({
  selector: "app-habits-page",
  imports: [HlmButtonImports, NgIcon, ResponsiveDialogSheet],
  templateUrl: "./habits-page.html",
  styleUrl: "./habits-page.css",
  viewProviders: [provideIcons({ lucidePlus })]
})
export class HabitsPage {

}
