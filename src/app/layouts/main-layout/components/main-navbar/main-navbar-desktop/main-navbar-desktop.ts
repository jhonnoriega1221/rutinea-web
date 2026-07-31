import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HlmTooltipImports } from "@spartan-ng/helm/tooltip";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideLayoutDashboard, lucideSettings, lucideListChecks } from "@ng-icons/lucide";
import { getMainNavigationItems } from "../../../../../core/navigation/domain/main-navigation.service";

@Component({
  selector: "app-main-navbar-desktop",
  imports: [HlmButtonImports, HlmTooltipImports, NgIcon, RouterLink, RouterLinkActive],
  templateUrl: "./main-navbar-desktop.html",
  styleUrl: "./main-navbar-desktop.css",
  viewProviders: [
    provideIcons({
      lucideLayoutDashboard,
      lucideSettings,
      lucideListChecks
    })
  ]
})
export class MainNavbarDesktop {
  readonly items = getMainNavigationItems();

  readonly topItems = this.items.filter((item) => item.url !== "/settings");
  readonly bottomItems = this.items.filter((item) => item.url === "/settings");
}
