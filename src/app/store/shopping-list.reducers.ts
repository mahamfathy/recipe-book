import { createReducer } from "@ngrx/store";
import { Ingredient } from "../shared/models/ingredients.models";
import { state } from "@angular/animations";
const initialState = {
   ingredients:  [
        new Ingredient('Apples', 5),
        new Ingredient('Tomato', 10),
      ]
}
export const shoppingListReducer = createReducer(
(state= initialState)=>{
   
} 
)