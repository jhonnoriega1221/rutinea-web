import { Component } from "@angular/core";
import { HlmCardImports } from "@spartan-ng/helm/card";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideContrast, lucideMoon, lucideSun, lucideLaptop2 } from "@ng-icons/lucide";
import { HlmToggleGroupImports } from "@spartan-ng/helm/toggle-group";

@Component({
  selector: "app-settings-page",
  imports: [HlmCardImports, HlmToggleGroupImports, NgIcon],
  templateUrl: "./settings-page.html",
  styleUrl: "./settings-page.css",
  viewProviders: [provideIcons({ lucideContrast, lucideMoon, lucideSun, lucideLaptop2 })]
})
export class SettingsPage {}
