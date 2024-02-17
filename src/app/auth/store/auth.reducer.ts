// I will use the second way to implement the reducer function

import { createReducer, on } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import {
  LOGIN_ACTION,
  LOGIN_FAIL_ACTION,
  LOGIN_START_ACTION,
  LOGOUT_ACTION,
} from './auth.actions';

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false,
};
export interface AuthState {
  user: User | null;
  authError: string | null;
  loading: boolean;
}

export const authReducer = createReducer(
  initialState,
  on(LOGIN_ACTION, (state, { email, userId, token, expirationDate }) => {
    const user = new User(email, userId, token, expirationDate);
    return { ...state, user, authError: null, loading: false };
  }),
  on(LOGOUT_ACTION, (state) => {
    return { ...state, user: null };
  }),
  on(LOGIN_START_ACTION, (state, action) => {
    {
      return { ...state, authError: null, loading: true };
    }
  }),
  on(LOGIN_FAIL_ACTION, (state, { errorMessage }) => {
    return { ...state, user: null, authError: errorMessage, loading: false };
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
