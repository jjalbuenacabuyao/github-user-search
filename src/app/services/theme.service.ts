import { Injectable } from '@angular/core';

export type Theme = "light" | "dark";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private theme: Theme = "dark"

  get() { return this.theme }
  set(theme: Theme) { this.theme = theme }
}
