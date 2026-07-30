import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MainHeader } from "./components/main-header/main-header";

@Component({
  selector: "app-main-layout",
  imports: [RouterOutlet, MainHeader],
  templateUrl: "./main-layout.html",
  styleUrl: "./main-layout.css"
})
export class MainLayout {}
