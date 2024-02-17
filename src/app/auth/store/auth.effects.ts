import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  LOGIN_ACTION,
  LOGIN_FAIL,
  LOGIN_FAIL_ACTION,
  LOGIN_START_ACTION,
  LOGOUT,
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
              const expirationDate = new Date(
                new Date().getTime() + +resData.expiresIn * 1000
              );
              return LOGIN_ACTION({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate,
              });
            }),
            catchError((errorRes) => {
                  let errorMessage = 'An unknown error occured!';

                  if (!errorRes.error || !errorRes.error.error) {
                    return of(LOGIN_FAIL_ACTION({ errorMessage }));
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
                  return of(LOGIN_FAIL_ACTION({ errorMessage }));
            })
          );
      })
    )
  );
  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LOGIN_ACTION),
        tap(() => this.router.navigate(['']))
      ),
    { dispatch: false }
  );
}
