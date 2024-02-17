// i will use the second way to implement the reducer function

import { Action } from '@ngrx/store';
import { User } from '../../shared/models/user.model';

export const initialState :Auth = {
  user: null,
};
export interface Auth {
  user: User | null;
}
export function authReducer(state = initialState, action: Action) {
  return state;
}
