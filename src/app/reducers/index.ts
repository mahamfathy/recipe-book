import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { shoppingListReducer, State as ShoppingListState } from '../shopping-list/store/shopping-list.reducers';
import {  authReducer } from '../auth/store/auth.reducer';
import * as AuthState from '../auth/store/auth.reducer'
export interface AppState {
  shoppingList: ShoppingListState;
  auth:AuthState.State
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth:authReducer
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
