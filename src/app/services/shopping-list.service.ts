import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/models/ingredients.models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>()
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomato', 10),
  ];
  constructor() {}
  getIngredients() {
    return this.ingredients.slice();
  }
  ingredientAdded(Ingredient: Ingredient) {
    this.ingredients.push(Ingredient);
    this.ingredientsChanged.next(this.ingredients.slice())
  }
  addIngredientsFromRecipe(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(ingredients.slice())
  }
}
