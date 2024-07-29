import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { SearchUserComponent } from "./search-user/search-user.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SearchUserComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {}
