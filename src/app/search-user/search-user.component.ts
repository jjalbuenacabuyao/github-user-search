import { Component } from '@angular/core';
import { GithubUserDataService } from '../services';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent {
  usernameForm: FormGroup;

  constructor(private githubUserDataService: GithubUserDataService, private formBuilder: FormBuilder) {
    this.usernameForm = this.formBuilder.group({
      username: ["", [Validators.required]]
    })
  }

  onSubmit() {
    if(this.usernameForm.valid) {
      this.githubUserDataService.setUsername(this.usernameForm.value.username);
      console.log(this.usernameForm.value.username);
    }
  }
}
