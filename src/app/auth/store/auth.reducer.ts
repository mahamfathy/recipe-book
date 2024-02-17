// I will use the second way to implement the reducer function

import { User } from '../../shared/models/user.model';
import { AuthActions, LOGIN, LOGOUT } from './auth.actions';

const initialState: State = {
  user: null,
};
export interface State {
  user: User | null;
}

export function authReducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case LOGIN:
      const { email, userId, token, expirationDate } = action.payload;
      const user = new User(email, userId, token, expirationDate);
      return {
        ...state,
        user: user,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}