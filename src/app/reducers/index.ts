import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { shoppingListReducer } from '../store/shopping-list.reducers';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
shoppingList:shoppingListReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
