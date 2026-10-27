import { Component, computed, inject } from "@angular/core";
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from "@angular/router";

import { HlmButtonImports } from "@spartan-ng/helm/button";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideLayoutDashboard, lucideSettings, lucideListChecks } from "@ng-icons/lucide";
import { getMainNavigationItems } from "../../../../../core/navigation/domain/main-navigation.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { filter, map } from "rxjs";
import { hiddenRoutePatterns } from "../../../../../core/navigation/data/main-navigation.data";

@Component({
  selector: "app-main-navbar-mobile",
  imports: [HlmButtonImports, NgIcon, RouterLink, RouterLinkActive],
  templateUrl: "./main-navbar-mobile.html",
  styleUrl: "./main-navbar-mobile.css",
  viewProviders: [
    provideIcons({
      lucideLayoutDashboard,
      lucideSettings,
      lucideListChecks
    })
  ]
})
export class MainNavbarMobile {
  readonly items = getMainNavigationItems();

  private readonly _router = inject(Router);

  // Definimos las rutas donde NO queremos que aparezca la barra en mobile
  private readonly _hiddenRoutes = hiddenRoutePatterns;

  // Capturamos la URL activa
  private readonly _currentUrl = toSignal(
    this._router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects.split("?")[0])
    ),
    { initialValue: this._router.url.split("?")[0] }
  );

  protected readonly hideBottomNav = computed(() => {
    const url = this._currentUrl();
    return this._hiddenRoutes.some((pattern) => pattern.test(url));
  });
}
