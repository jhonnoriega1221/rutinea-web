import { Component } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HomeGreeting } from "../../components/home-greeting/home-greeting";

@Component({
  selector: "app-home-page",
  imports: [HlmButtonImports, HomeGreeting],
  standalone: true,
  templateUrl: "./home-page.html",
  styleUrl: "./home-page.css"
})
export class HomePage {}
