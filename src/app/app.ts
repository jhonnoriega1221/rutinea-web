import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ResponsiveDialog } from "./shared/components/responsive-dialog/responsive-dialog";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ResponsiveDialog],
  templateUrl: "./app.html",
  styleUrl: "./app.css"
})
export class App {}
