import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user.service';
import { AuthRequest } from 'src/app/models/auth-request';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  authRequest: AuthRequest;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  signupError: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    // console.log(form)
    if (form.invalid) {
      return;
    }
    let userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email.toLocaleLowerCase(),
      password: this.password,
    };

    this.signupError = false

    this.userService.addUser(userData).subscribe((user) => {
      this.authRequest = {
        email: this.email.toLocaleLowerCase(),
        password: this.password,
      };
      this.auth.logIn$(this.authRequest).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (err) => {
          console.warn(`Authentication failed: ${err.message}`);
        },
      });
    },
    
    (err) => {
        this.signupError = true;
    });
  }
}
