import { Component } from "@angular/core";
import { GithubUserDataService } from "../services";

type User = {
  name: string;
  username: string;
  avatarUrl: string;
  company: string;
  blog: string;
  bio: string;
  location: string;
  twitterUsername: string;
  publicRepositories: number;
  followers: number;
  following: number;
  joinedDate: string;
};

@Component({
  selector: "app-user-card",
  standalone: true,
  imports: [],
  templateUrl: "./user-card.component.html",
  styleUrl: "./user-card.component.css",
})
export class UserCardComponent {
  userData: User = {
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
  username = "jjalbuenacabuyao";

  constructor(private githubUserDataService: GithubUserDataService) {
    this.fetchUserData();
  }

  fetchUserData() {
    this.githubUserDataService.getUserData(this.username).subscribe({
      next: (data) => {
        const {
          login,
          name,
          avatar_url,
          company,
          blog,
          location,
          bio,
          twitter_username,
          public_repos,
          followers,
          following,
          created_at,
        } = data;

        const joinedAt = created_at.split("T")[0];
        const parsedJoinedAt = joinedAt.split("-");

        const year = parsedJoinedAt[0];
        const month = parsedJoinedAt[1];
        const day = parsedJoinedAt[2];

        // Converts month to shortened text version
        const date = new Date(year, month, day);
        date.setMonth(month - 1);

        const monthTxt = date.toLocaleString("en", { month: "short" });

        let extractedUserData: User = {
          name: name,
          username: `@${login}`,
          avatarUrl: avatar_url,
          company: company ? company : "Not available",
          blog: blog ? blog : "Not available",
          bio: bio ? bio : "Not available",
          location: location ? location : "Not available",
          twitterUsername: twitter_username
            ? twitter_username
            : "Not available",
          publicRepositories: public_repos,
          followers: followers,
          following: following,
          joinedDate: `${day} ${monthTxt} ${year}`,
        };

        this.userData = extractedUserData;
        console.log(this.userData);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
