
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
import { Action, createAction, props } from '@ngrx/store';
export const AUTHENTICATE_SUCCESS_ACTION = createAction(
  '[Auth] Authenticate Success',
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }>()
);
export const LOGOUT_ACTION = createAction('[Auth] Logout');
export const LOGIN_START_ACTION = createAction(
  '[Auth] Login Start',
  props<{
    email: string;
    password: string;
  }>()
);
export const SIGNUP_START_ACTION = createAction(
  '[Auth] Signup Start',
  props<{
    email: string;
    password: string;
  }>()
);

export const AUTHENTICATE_FAIL_ACTION = createAction(
  '[Auth] Authenticate Fail',
  props<{
    errorMessage: string;
  }>()
);
export const CLEAR_ERROR_ACTION = createAction('[Auth] Clear Error');
export const AUTO_LOGIN_ACTION = createAction('[Auth] Auto Login');
