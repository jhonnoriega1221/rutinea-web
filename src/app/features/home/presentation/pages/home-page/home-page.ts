import { Component } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";

@Component({
  selector: "app-home-page",
  imports: [HlmButtonImports],
  standalone: true,
  templateUrl: "./home-page.html",
  styleUrl: "./home-page.css"
})
export class HomePage {}
