import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/models/ingredients.models';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>()
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
    this.ingredientsChanged.emit(this.ingredients.slice())
  }
}
