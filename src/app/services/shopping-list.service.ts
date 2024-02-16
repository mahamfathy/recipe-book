import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/models/ingredients.models';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { DELETE_INGREDIENT, UPDATE_INGREDIENT } from '../store/shopping-list.actions';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomato', 10),
  ];
  constructor(private store :Store<{shoppingList:{ingredients:Ingredient[]}}>) {}
  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  ingredientAdded(Ingredient: Ingredient) {
    this.ingredients.push(Ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredientsFromRecipe(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(ingredients.slice());
  }
  updateIngredients(index: number, newIngredient: Ingredient) {
    // this.ingredients[index] = newIngredient;
    // this.ingredientsChanged.next(this.ingredients.slice());
    this.store.dispatch(UPDATE_INGREDIENT({index:index,ingredient:newIngredient}))
  }
  deleteIngredient(index:number){
    // this.ingredients.splice(index,1)
    // this.ingredientsChanged.next(this.ingredients.slice())
    this.store.dispatch(DELETE_INGREDIENT({index:index}))

  }
}
