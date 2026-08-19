import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { APP_ICONS } from "./shared/components/icons/app-icons";
import { ThemeService } from "./core/theme/theme.service";
import { routes } from "./app.routes";
import { provideIcons } from "@ng-icons/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideIcons(APP_ICONS),
    provideAppInitializer(() => {
      const themeService = inject(ThemeService);
      themeService.initialize();
    })
  ]
};
