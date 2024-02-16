import { Action, createAction, props } from '@ngrx/store';
import { Ingredient } from '../shared/models/ingredients.models';

export const ADD_INGREDIENT = createAction('[INGREDIENT] Add Ingredient',
props<{ingredients :Ingredient[]}>()
);
// export const ADD_INGREDIENT = 'INGREDIENT'
// export class AddIngredient implements Action{
//      readonly type: string= ADD_INGREDIENT; 
//       payload!:Ingredient
// }

// export type ShoppingListActions = AddIngredient