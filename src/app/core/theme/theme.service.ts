import { Injectable } from "@angular/core";
import { ThemeMode } from "./theme.types";

const THEME_COLORS = {
  light: "#dff9ee",
  dark: "#090f09"
} as const;

@Injectable({ providedIn: "root" })
export class ThemeService {
  private readonly storageKey = "theme-preference";
  private readonly root = document.documentElement;
  private readonly systemQuery = window.matchMedia("(prefers-color-scheme: dark)");

  private mode: ThemeMode = "system";

  initialize() {
    this.mode = this.getPreferredTheme();
    this.applyTheme();

    this.systemQuery.addEventListener("change", () => {
      if (this.mode === "system") this.applyTheme();
    });
  }

  getPreferredTheme() {
    const saved = localStorage.getItem(this.storageKey) as ThemeMode;
    return saved === "dark" || saved === "light" || saved === "system" ? saved : "system";
  }

  setTheme(theme: ThemeMode) {
    this.mode = theme;
    localStorage.setItem(this.storageKey, theme);
    this.applyTheme();
  }

  private applyTheme() {
    const isDark = this.mode === "system" ? this.systemQuery.matches : this.mode === "dark";
    this.root.classList.toggle("dark", isDark);
    this.root.classList.toggle("light", !isDark);

    document
      .querySelector("meta[name=theme-color]")
      ?.setAttribute("content", isDark ? THEME_COLORS.dark : THEME_COLORS.light);
  }
}
