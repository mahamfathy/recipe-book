import { Action, createAction, props } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const SIGNUP_START = '[Auth] Signup Start';
export const SIGNUP = '[Auth] Signup';
export const LOGOUT = '[Auth] Logout';

// I used another way to implement actions

// export class Login implements Action {
//   readonly type = LOGIN;
//   constructor(
//     public payload: {
//       email: string;
//       userId: string;
//       token: string;
//       expirationDate: Date;
//     }
//   ) {}
// }

// export class Logout implements Action {
//   readonly type = LOGOUT;
// }

// export type AuthActions = Login | Logout

export const AUTHENTICATE_SUCCESS_ACTION = createAction(
  AUTHENTICATE_SUCCESS,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }>()
);

export const LOGOUT_ACTION = createAction(LOGOUT);
export const LOGIN_START_ACTION = createAction(
  LOGIN_START,
  props<{
    email: string;
    password: string;
  }>()
);
export const SIGNUP_START_ACTION = createAction(
  SIGNUP_START,
  props<{
    email: string;
    password: string;
  }>()
);

export const AUTHENTICATE_FAIL_ACTION = createAction(
  AUTHENTICATE_FAIL,
  props<{
    errorMessage: string;
  }>()
);
