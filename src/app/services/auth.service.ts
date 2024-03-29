import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AuthResponseData } from '../shared/models/auth-response-data.model';
// import { catchError, tap } from 'rxjs/operators';
// import { BehaviorSubject, throwError } from 'rxjs';
// import { User } from '../shared/models/user.model';
// import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { LOGOUT_ACTION } from '../auth/store/auth.actions';
// import {
// AUTHENTICATE_SUCCESS_ACTION,
// LOGOUT_ACTION,
// } from '../auth/store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user = new BehaviorSubject<User>(null!);
  // token!: string | null; or i can use behaviorSubject
  private tokenExpirationTime: any;
  constructor(
    // private http: HttpClient,
    // private router: Router,
    private store: Store<AppState>
  ) {}

  // signUp(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0xX7FJdLBTD1M-Ohwc6fbHDB8ygUrbWM',
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((resData) => {
  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }
  // login(email: string, password: string) {
  // return this.http
  //   .post<AuthResponseData>(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0xX7FJdLBTD1M-Ohwc6fbHDB8ygUrbWM',
  //     {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true,
  //     }
  //   )
  //   .pipe(
  //     catchError(this.handleError),
  //     tap((resData) => {
  //       this.handleAuthentication(
  //         resData.email,
  //         resData.localId,
  //         resData.idToken,
  //         +resData.expiresIn
  //       );
  //     })
  //   );
  // }

  // autoLogin() {
  //   const userData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExpirationDate: Date;
  //   } = JSON.parse(localStorage.getItem('userData')!);
  //   if (!userData) {
  //     return;
  //   }
  //   const loadedUser = new User(
  //     userData.email,
  //     userData.id,
  //     userData._token,
  //     new Date(userData._tokenExpirationDate)
  //   );
  //   if (loadedUser.token) {
  //     // this.user.next(loadedUser);
  //     this.store.dispatch(
  //       AUTHENTICATE_SUCCESS_ACTION({
  //         email: loadedUser.email,
  //         userId: loadedUser.id,
  //         token: loadedUser.token,
  //         expirationDate: new Date(userData._tokenExpirationDate),
  //       })
  //     );
  //     const tokenExpirationDate =
  //       new Date(userData._tokenExpirationDate).getTime() -
  //       new Date().getTime();
  //     this.autoLogout(tokenExpirationDate);
  //   }
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage: string = 'An unknown error occured!';

  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(errorMessage);
  //   }
  //   switch (errorRes.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMessage = 'This Email already exists!';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage = "This Email doesn't exit!";
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMessage = 'Invalid password, check again!';
  //       break;
  //   }
  //   return throwError(errorMessage);
  // }
  // private handleAuthentication(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, userId, token, expirationDate);
  //   // this.user.next(user);
  //   this.store.dispatch(
  //     AUTHENTICATE_SUCCESS_ACTION({
  //       email: email,
  //       userId: userId,
  //       token: token,
  //       expirationDate: expirationDate,
  //     })
  //   );
  //   this.autoLogout(expiresIn * 1000);
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }
  // logout() {
  //   // this.user.next(null!);
  //   this.store.dispatch(LOGOUT_ACTION());
  //   // this.router.navigate(['/auth']);
  //   // localStorage.clear() we use this to clear all of the data but prefer to use removeItem
  //   // localStorage.removeItem('userData');
  //   if (this.tokenExpirationTime) {
  //     clearTimeout(this.tokenExpirationTime);
  //   }
  //   this.tokenExpirationTime = null;
  // }
  // autoLogout(expirationDate: number) {
  //   console.log(expirationDate);
  //   this.tokenExpirationTime = setTimeout(() => {
  //     // this.logout();
  //   }, expirationDate);
  //   return this.tokenExpirationTime;
  // }
  setLogoutTimer(expirationDate: number) {
    console.log(expirationDate);
    this.tokenExpirationTime = setTimeout(() => {
      // this.logout();
      this.store.dispatch(LOGOUT_ACTION());
    }, expirationDate);
    return this.tokenExpirationTime;
  }
  clearLogoutTimer() {
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
      this.tokenExpirationTime = null;
    }
  }
}
