import { Action, createAction, props } from '@ngrx/store';
import { Ingredient } from '../../shared/models/ingredients.models';

export const ADD_INGREDIENT = createAction(
  '[Shopping List] Add Ingredient',
  props<{ ingredients: Ingredient[] }>()
);
export const ADD_INGREDIENTS = createAction(
  '[Shopping List] Add Ingredients',
  props<{ ingredients: Ingredient[] }>()
);

export const UPDATE_INGREDIENT = createAction(
  '[Shopping List] Update Ingredient',
  props<{ ingredient: Ingredient }>()
);
export const DELETE_INGREDIENT = createAction(
  '[Shopping List] Delete Ingredient',
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
