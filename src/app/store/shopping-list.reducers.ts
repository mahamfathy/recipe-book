import { Action, createReducer, on } from '@ngrx/store';
import { Ingredient } from '../shared/models/ingredients.models';
import { ADD_INGREDIENT } from './shopping-list.actions';
// import * as  ShoppingListAction from './shopping-list.actions';
const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomato', 10)],
};
export const shoppingListReducer = createReducer(
    initialState,
//   on(ShoppingListAction.ADD_INGREDIENT,(state ,{ingredients})=>({...state,ingredients: [...state.ingredients, ...ingredients]}) )
//   on(ADD_INGREDIENT,(state ,action)=>({...state,ingredients: [...state.ingredients, ...action.ingredients]}) )
  on(ADD_INGREDIENT,(state ,{ingredients})=>({...state,ingredients: [...state.ingredients, ...ingredients]}) )
)
// export function shoppingListReducer(state = initialState, action : Action) {
//   switch (action.type) {
//     case ADD_INGREDIENT:
//         return { ...state, ingredients: [...state.ingredients, action.payload] };
//   }
// default;
// return state

// }

// export function shoppingListReducer(state = initialState, action : Action) {
//   switch (action.type) {
//     case ADD_INGREDIENT:
//         return { ...state, ingredients: [...state.ingredients, action] };

//   }
//   return initialState
// }
