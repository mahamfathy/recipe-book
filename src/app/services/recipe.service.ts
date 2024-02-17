import { Injectable } from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';
import { Ingredient } from '../shared/models/ingredients.models';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { ADD_INGREDIENTS } from '../shopping-list/store/shopping-list.actions';
import { State } from '../shopping-list/store/shopping-list.reducers';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel-just awesome!',
      'https://tse2.mm.bing.net/th?id=OIP.3WPb79pG73o6KJpXmLtaegHaFc&pid=Api&P=0&h=220',
      [new Ingredient('Meat', 1), new Ingredient('French fries', 20)]
    ),
    new Recipe(
      'Big Burger Fat',
      'What else you need to say?',
      'https://tse2.mm.bing.net/th?id=OIP.GQqW9JvGbj0BAkbkIiIeHQHaE7&pid=Api&P=0&h=220',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];
  constructor(
    private shoppingService: ShoppingListService,
    private store: Store<State>
  ) {}
  getRecipes() {
    return this.recipes.slice();
  }
  setRecipe(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  getRecipesById(id: number) {
    return this.recipes[id];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingService.addIngredientsFromRecipe(ingredients);
    this.store.dispatch(ADD_INGREDIENTS({ ingredients: ingredients }));
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
