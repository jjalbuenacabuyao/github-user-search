import { Component, inject } from '@angular/core';
import { Theme, ThemeService } from '../services/theme.service';

type ColorTheme = "dark" | "light";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  private themeService = inject(ThemeService)

  theme = this.themeService.get();
  setTheme() {
    if (this.theme === "dark") {
      this.themeService.set("light");
    } else {
      this.themeService.set("dark");
    }
  }
}
