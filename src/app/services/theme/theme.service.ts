import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import {
  Inject,
  Injectable,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from "@angular/core";
import { LocalStorageService } from "../localStorage/local-storage.service";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private theme!: string | null;
  private THEME_KEY = "theme";

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private localStorageService: LocalStorageService
  ) {
    this.init();
  }

  get() {
    return this.theme;
  }

  init() {
    if (isPlatformBrowser(this.platformId)) {
      const selectedTheme = this.localStorageService.getItem(this.THEME_KEY);

      if (selectedTheme === "dark" || selectedTheme === "light") {
        this.theme = selectedTheme;
        this.document.body.setAttribute("data-theme", selectedTheme);
      }
    }
  }

  private setTheme(theme: string) {
    this.localStorageService.setItem(this.THEME_KEY, theme);
    this.document.body.setAttribute("data-theme", theme);
    this.theme = theme;
  }

  toggleTheme() {
    this.theme === "dark" ? this.setTheme("light") : this.setTheme("dark");
  }
}
