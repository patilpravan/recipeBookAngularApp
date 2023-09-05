import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse, AuthenticateService } from '../authenticate.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate-user',
  templateUrl: './authenticate-user.component.html',
  styleUrls: ['./authenticate-user.component.css'],
})
export class AuthenticateUserComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) {}

  switchLoginMode() {
    this.error = null;
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(authForm: NgForm) {
    this.error = null;
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const pass = authForm.value.password;
    console.log(email, pass);
    this.isLoading = true;
    let authObs: Observable<AuthResponse>;
    if (this.isLoginMode) {
      authObs = this.authService.loginUser(email, pass);
    } else {
      authObs = this.authService.signUpUser(email, pass);
    }
    authObs.subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (err) => {
        console.log(err);
        this.error = `An Error Occured : ${err?.error?.error?.message}`;
        this.isLoading = false;
      }
    );
    authForm.reset();
  }
  onClose() {
    this.error = null;
  }
}
