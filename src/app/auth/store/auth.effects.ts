import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AUTHENTICATE_FAIL_ACTION,
  AUTHENTICATE_SUCCESS_ACTION,
  LOGIN_START_ACTION,
  LOGOUT,
  LOGOUT_ACTION,
  SIGNUP_START_ACTION,
} from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { AuthResponseData } from '../../shared/models/auth-response-data.model';
import { Router } from '@angular/router';
// import * as authActions from './auth.actions'
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
  handleAuthentication = (
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    return AUTHENTICATE_SUCCESS_ACTION({
      email: email,
      userId: userId,
      token: token,
      expirationDate: expirationDate,
    });
  };
  handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occured!';

    if (!errorRes.error || !errorRes.error.error) {
      return of(AUTHENTICATE_FAIL_ACTION({ errorMessage }));
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
    return of(AUTHENTICATE_FAIL_ACTION({ errorMessage }));
  };
  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGIN_START_ACTION),
      switchMap((authData) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0xX7FJdLBTD1M-Ohwc6fbHDB8ygUrbWM',
            {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              return this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.expiresIn,
                +resData.idToken
              );
            }),
            catchError((errorRes) => {
              return this.handleError(errorRes);
            })
          );
      })
    )
  );
  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AUTHENTICATE_SUCCESS_ACTION,LOGOUT_ACTION),
        tap(() => this.router.navigate(['']))
      ),
    { dispatch: false }
  );

  authSignupStart = this.actions$.pipe(
    ofType(SIGNUP_START_ACTION),
    switchMap((signupAction) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0xX7FJdLBTD1M-Ohwc6fbHDB8ygUrbWM',
          {
            email: signupAction.email,
            password: signupAction.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((resData) => {
            return this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.expiresIn,
              +resData.idToken
            );
          }),
          catchError((errorRes) => {
            return this.handleError(errorRes);
          })
        );
    })
  );
}
