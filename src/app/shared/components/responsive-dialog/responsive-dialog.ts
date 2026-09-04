import { afterNextRender, Component, computed, inject, viewChild } from "@angular/core";
import { ResponsivePopup } from "../responsive-popup/responsive-popup";
import { NgIcon } from "@ng-icons/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { ResponsiveDialogService } from "../../services/responsive-dialog.service";
import { DialogType } from "./models/responsive-dialog.types";

export const DIALOG_ICON_MAP: Record<DialogType, string> = {
  warning: "lucideAlertTriangle",
  error: "lucideXCircle",
  info: "lucideCircleQuestionMark",
  success: "lucideCheckCircle2"
};

@Component({
  selector: "app-responsive-dialog",
  imports: [ResponsivePopup, NgIcon, HlmButtonImports],
  templateUrl: "./responsive-dialog.html",
  styleUrl: "./responsive-dialog.css"
})
export class ResponsiveDialog {
  private readonly _dialogService = inject(ResponsiveDialogService);

  private readonly responsivePopup = viewChild.required<ResponsivePopup>("responsivePopup");

  protected readonly config = this._dialogService.config;
  protected readonly isLoading = this._dialogService.isLoading;

  protected readonly type = computed(() => this.config()?.type ?? "info");
  protected readonly title = computed(() => this.config()?.title);
  protected readonly message = computed(() => this.config()?.message);
  protected readonly confirmButtonLabel = computed(
    () => this.config()?.confirmButtonLabel ?? "Accept"
  );
  protected readonly cancelButtonLabel = computed(() => this.config()?.cancelButtonLabel);

  protected readonly icon = computed(() => DIALOG_ICON_MAP[this.type()]);
  protected readonly iconThemeClasses = computed(() => {
    const currentType = this.type();
    switch (currentType) {
      case "success":
        return "bg-success/20 text-success";
      case "error":
        return "bg-destructive/10 text-destructive";
      case "warning":
        return "bg-warning/20 text-warning";
      case "info":
      default:
        return "bg-info/20 text-info";
    }
  });

  constructor() {
    afterNextRender(() => {
      this._dialogService._register({
        open: () => this.responsivePopup().open(),
        close: () => this.responsivePopup().close()
      });
    });
  }

  protected onConfirm() {
    if (this.isLoading()) return;
    this._dialogService.confirm();
  }
  protected onCancel() {
    if (this.isLoading()) return;
    this._dialogService.cancel();
  }
}
