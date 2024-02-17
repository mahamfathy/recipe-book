import { Action, createAction, props } from '@ngrx/store';
import { Ingredient } from '../shared/models/ingredients.models';

export const ADD_INGREDIENT = createAction(
  '[INGREDIENT] Add Ingredient',
  props<{ ingredients: Ingredient[] }>()
);
export const ADD_INGREDIENTS = createAction(
  '[INGREDIENTS] Add Ingredients',
  props<{ ingredients: Ingredient[] }>()
);

export const UPDATE_INGREDIENT = createAction(
  '[INGREDIENT] Update Ingredient',
  props<{ ingredient: Ingredient }>()
);
export const DELETE_INGREDIENT = createAction(
  '[INGREDIENT] Delete Ingredient',
);
export const START_EDIT = createAction(
  '[INGREDIENT] Start Edit',
  props<{ index: number}>()
);
export const STOP_EDIT = createAction(
  '[INGREDIENT] Stop Edit',
);
// export const ADD_INGREDIENT = 'INGREDIENT'
// export class AddIngredient implements Action{
//      readonly type: string= ADD_INGREDIENT;
//       payload!:Ingredient
// }

// export type ShoppingListActions = AddIngredient
