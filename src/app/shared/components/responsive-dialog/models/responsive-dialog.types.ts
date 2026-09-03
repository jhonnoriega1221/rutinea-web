export type DialogType = "info" | "warning" | "error" | "success";
export type ButtonVariant = "default" | "destructive" | "secondary" | "outline" | "ghost";

export interface ResponsiveDialogConfig {
  type?: DialogType;
  title?: string;
  message?: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
}
