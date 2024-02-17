import { Action, createReducer, on } from '@ngrx/store';
import { Ingredient } from '../shared/models/ingredients.models';
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  START_EDIT,
  STOP_EDIT,
  UPDATE_INGREDIENT,
} from './shopping-list.actions';
// import * as  ShoppingListAction from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  edittedIngredientIndex: number;
}
const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomato', 10)],
  editedIngredient: null!,
  edittedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(
  initialState,
  //   on(ShoppingListAction.ADD_INGREDIENT,(state ,{ingredients})=>({...state,ingredients: [...state.ingredients, ...ingredients]}) )
  //   on(ADD_INGREDIENT,(state ,action)=>({...state,ingredients: [...state.ingredients, ...action.ingredients]}) )
  on(ADD_INGREDIENT, (state, { ingredients }) => ({
    ...state,
    ingredients: [...state.ingredients, ...ingredients],
  })),
  on(ADD_INGREDIENTS, (state, { ingredients }) => ({
    ...state,
    ingredients: [...state.ingredients, ...ingredients],
  })),
  on(UPDATE_INGREDIENT, (state, { ingredient }) => ({
    ...state,
    ingredients: state.ingredients.map((oldIngredient, i) =>
      i === state.edittedIngredientIndex ? ingredient : oldIngredient
    ),
  })),
  on(DELETE_INGREDIENT, (state ) => ({
    ...state,
    ingredients: state.ingredients.filter((_, i) => i !== state.edittedIngredientIndex),
  })),
  on(START_EDIT,(state,{index})=>({
    ...state,
   edittedIngredientIndex: index,
   editedIngredient: {...state.ingredients[index]}
  })),
  on(STOP_EDIT,(state=>({...state,editedIngredient:null!,edittedIngredientIndex:-1}) ))
);
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
