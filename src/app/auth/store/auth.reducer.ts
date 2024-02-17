// I will use the second way to implement the reducer function

import { createReducer, on } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import {  LOGIN_ACTION, LOGOUT_ACTION } from './auth.actions';

const initialState: AuthState = {
  user: null,
};
export interface AuthState {
  user: User | null;
}

export const authReducer = createReducer(
  initialState,
  on(LOGIN_ACTION, (state, { email, userId, token, expirationDate }) => {
    const user = new User(email, userId, token, expirationDate);
    return { ...state, user };
  }),
  on(LOGOUT_ACTION, (state, action) => {
    return { state, user: null };
  })
);

// export function authReducer(state = initialState, action: AuthActions):AuthState {
//   switch (action.type) {
//     case LOGIN:
//       const { email, userId, token, expirationDate } = action.payload;
//       const user = new User(email, userId, token, expirationDate);
//       return {
//         ...state,
//         user: user,
//       };
//     case LOGOUT:
//       return {
//         ...state,
//         user: null,
//       };
//     default:
//       return state;
//   }
// }
