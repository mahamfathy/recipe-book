import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { shoppingListReducer, State } from '../shopping-list/store/shopping-list.reducers';

export interface AppState {
  shoppingList: State;
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
