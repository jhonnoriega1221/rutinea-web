import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MainNavbar } from "./components/main-navbar/main-navbar";

@Component({
  selector: "app-main-layout",
  imports: [RouterOutlet, MainNavbar],
  templateUrl: "./main-layout.html",
  styleUrl: "./main-layout.css"
})
export class MainLayout {}
