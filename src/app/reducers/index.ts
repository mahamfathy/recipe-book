import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { shoppingListReducer, State } from '../shopping-list/store/shopping-list.reducers';
import { Auth, authReducer } from '../auth/store/auth.reducer';

export interface AppState {
  shoppingList: State;
  auth:Auth
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth:authReducer
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
