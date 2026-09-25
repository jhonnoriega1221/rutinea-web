import { Component, inject } from "@angular/core";
import { HlmCardImports } from "@spartan-ng/helm/card";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { HlmToggleGroupImports } from "@spartan-ng/helm/toggle-group";

import { ThemeService } from "../../../../../core/theme/theme.service";
import { ThemeMode } from "../../../../../core/theme/theme.types";
import { AppInfoService } from "../../../../../core/app-info/app-info.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-settings-page",
  imports: [HlmCardImports, HlmToggleGroupImports, NgIcon, RouterLink],
  templateUrl: "./settings-page.html",
  styleUrl: "./settings-page.css"
})
export class SettingsPage {
  private readonly themeService = inject(ThemeService);
  private readonly appInfo = inject(AppInfoService);

  readonly actualTheme = this.themeService.getPreferredTheme();
  readonly version = this.appInfo.version;

  selectTheme(value: ThemeMode) {
    this.themeService.setTheme(value);
  }
}
