import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { ThemeService } from "./core/theme/theme.service";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAppInitializer(() => {
      const themeService = inject(ThemeService);
      themeService.initialize();
    })
  ]
};
