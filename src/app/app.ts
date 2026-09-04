import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ResponsiveDialog } from "./shared/components/responsive-dialog/responsive-dialog";
import { HlmToasterImports } from "@spartan-ng/helm/sonner";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ResponsiveDialog, HlmToasterImports],
  templateUrl: "./app.html",
  styleUrl: "./app.css"
})
export class App {}
