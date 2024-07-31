import { Component } from "@angular/core";
import { GithubUserDataService } from "../services";
import { UserData } from "../services/githubUserData/github-user-data.service";

@Component({
  selector: "app-user-card",
  standalone: true,
  imports: [],
  templateUrl: "./user-card.component.html",
  styleUrl: "./user-card.component.css",
})
export class UserCardComponent {
  userData: UserData = {
    name: "",
    username: "",
    avatarUrl: "",
    company: "",
    blog: "",
    bio: "",
    location: "",
    twitterUsername: "",
    publicRepositories: 0,
    followers: 0,
    following: 0,
    joinedDate: "",
  };

  constructor(private githubUserDataService: GithubUserDataService) {
    this.fetchUserData();
  }

  fetchUserData() {
    this.userData = this.githubUserDataService.getUserData();
  }
}
