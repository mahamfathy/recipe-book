import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataStorageService } from './data-storage.service';
import { RecipeService } from './recipe.service';
import { Recipe } from '../shared/models/recipe.model';

export const recipesResolver: ResolveFn<Recipe[]> = (route, state) => {
  const dataStorageSevice = inject(DataStorageService);
  const recipeService = inject(RecipeService);
  const recipes = recipeService.getRecipes();
  if (recipes.length === 0) {
    return dataStorageSevice.fetchData();
  } else {
    return recipes;
  } 
};
