import { Injectable, signal } from "@angular/core";
import { ResponsiveDialogConfig } from "../components/responsive-dialog/models/responsive-dialog.types";

interface DialogController {
  open: () => void;
  close: () => void;
}

@Injectable({
  providedIn: "root"
})
export class ResponsiveDialogService {
  private _controller: DialogController | null = null;
  private _resolver: ((value: boolean) => void) | null = null;

  private readonly _config = signal<ResponsiveDialogConfig | null>(null);
  private readonly _isLoading = signal(false);

  readonly config = this._config.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  _register(controller: DialogController) {
    this._controller = controller;
  }

  async open(config?: ResponsiveDialogConfig): Promise<boolean> {
    this._resolver = null;

    this._config.set(config ?? {});
    this._controller?.open();

    return new Promise((resolve) => {
      this._resolver = resolve;
    });
  }

  confirm() {
    this._resolve(true);
  }

  cancel() {
    this._resolve(false);
  }

  setLoading(loading: boolean) {
    this._isLoading.set(loading);
  }

  private _resolve(result: boolean) {
    this._controller?.close();
    this._resolver?.(result);
    this._resolver = null;
  }
}
