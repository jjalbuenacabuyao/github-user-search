import { Component, inject } from "@angular/core";
import { ThemeService } from "../services/index";

type ColorTheme = "dark" | "light";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  private themeService = inject(ThemeService);

  theme = this.themeService.get();
  setTheme() {
    this.themeService.toggleTheme();
    this.theme = this.themeService.get();
  }
}
