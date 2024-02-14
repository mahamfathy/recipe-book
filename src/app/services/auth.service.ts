import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseData } from '../shared/models/auth-response-data.model';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null!);
  // token!: string | null; or i can use behaviorSubject
  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0xX7FJdLBTD1M-Ohwc6fbHDB8ygUrbWM',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
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
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0xX7FJdLBTD1M-Ohwc6fbHDB8ygUrbWM',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
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

  autoLogin() {
    const userDataString: any = localStorage.getItem('userData');
    const userData: User = JSON.parse(userDataString);
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.token,
      new Date(userData.tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser)
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string = 'An unknown error occured!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This Email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "This Email doesn't exit!";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password, check again!';
        break;
    }
    return throwError(errorMessage);
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  logout() {
    this.user.next(null!);
    this.router.navigate(['/auth']);
  }
}
