import { Injectable } from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';
import { Ingredient } from '../shared/models/ingredients.models';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel-just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('French fries', 20)]
    ),
    new Recipe(
      'Big Burger Fat',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];
  constructor(private shoppingService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipesById(id: number) {
    return this.recipes[id];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredientsFromRecipe(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());

  }
}
