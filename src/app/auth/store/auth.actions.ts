import { Action, createAction, props } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const LOGIN = '[Auth] Login';
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

export const LOGIN_ACTION = createAction(
  LOGIN,
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

export const LOGIN_FAIL_ACTION = createAction(
  LOGIN_FAIL,
  props<{
    errorMessage: string;
  }>()
);

