import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { CLEAR_SHOPPINGLIST } from '../store/shoping-list/shoping-list.actions';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  user = new BehaviorSubject<User>(null);
  logoutTimer: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {}

  signUpUser(email: string, pass: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAodjQ379vzLAzSeCLmW5leg2VXWYKIYG8',
        {
          email: email,
          password: pass,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  loginUser(email: string, pass: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAodjQ379vzLAzSeCLmW5leg2VXWYKIYG8',
        {
          email: email,
          password: pass,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  private handleAuthentication(
    email: string,
    id: string,
    token: string,
    expirationTime: number
  ) {
    let expirationDate = new Date(new Date().getTime() + expirationTime * 1000);
    const loggedInUser = new User(email, id, token, expirationDate);
    this.user.next(loggedInUser);
    localStorage.setItem('userData', JSON.stringify(loggedInUser));
    this.autoLogoutUser(expirationTime * 1000);
  }
  logoutUser() {
    localStorage.removeItem('userData');
    this.store.dispatch(CLEAR_SHOPPINGLIST());
    this.user.next(null);
    this.router.navigate(['/authenticate']);
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
  }
  autoLogin() {
    const loggedInUser = JSON.parse(localStorage.getItem('userData'));
    if (!loggedInUser) {
      return;
    }
    const loggedInUSerObj = new User(
      loggedInUser.email,
      loggedInUser.id,
      loggedInUser._token,
      new Date(loggedInUser._expirationDate)
    );
    if (loggedInUSerObj.token) {
      this.user.next(loggedInUSerObj);
      this.router.navigate(['/recipes']);
      this.autoLogoutUser(
        new Date(loggedInUser._expirationDate).getTime() - new Date().getTime()
      );
    }
  }
  autoLogoutUser(expirationTime: number) {
    this.logoutTimer = setTimeout(() => {
      this.logoutUser();
    }, expirationTime);
  }
}
