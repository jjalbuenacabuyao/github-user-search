import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";

type ApiData = {
  name: string | null;
  login: string | null;
  avatar_url: string | null;
  company: string | null;
  blog: string | null;
  bio: string | null;
  location: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string | null;
};

export type UserData = {
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

@Injectable({
  providedIn: "root",
})
export class GithubUserDataService {
  private baseUrl = "https://api.github.com/users/";
  private username = signal("jjalbuenacabuyao");
  private userData: UserData = {
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

  constructor(private http: HttpClient) {}

  setUsername(inputUsername: string) {
    this.username.set(inputUsername);
    this.getUserData();
  }

  initiateApiRequest(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${username}`);
  }

  normalizeApiData(data: ApiData): UserData {
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

    const validate = (input: string | null) =>
      input ? input : "Not available";

    const userData: UserData = {
      name: validate(name),
      username: `@${validate(login)}`,
      avatarUrl: validate(avatar_url),
      company: validate(company),
      blog: validate(blog),
      bio: validate(bio),
      location: validate(location),
      twitterUsername: validate(twitter_username),
      publicRepositories: public_repos,
      followers: followers,
      following: following,
      joinedDate: "",
    };

    if (created_at) {
      const joinedAt = created_at.split("T")[0];
      const parsedJoinedAt = joinedAt.split("-");

      const year = parseInt(parsedJoinedAt[0]);
      const month = parseInt(parsedJoinedAt[1]);
      const day = parseInt(parsedJoinedAt[2]);

      // Converts month to shortened text version
      const date = new Date(year, month, day);
      date.setMonth(month - 1);

      const monthTxt = date.toLocaleString("en", { month: "short" });

      userData.joinedDate = `${day} ${monthTxt} ${year}`;
    }

    return userData;
  }

  fetchData() {
    this.initiateApiRequest(this.username()).subscribe({
      next: (data: ApiData) => {
        const normalizedUserData = this.normalizeApiData(data);
        this.userData = normalizedUserData;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getUserData() {
    this.fetchData();
    return this.userData;
  }
}
