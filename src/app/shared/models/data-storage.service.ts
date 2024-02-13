import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Recipe } from './recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from './recipe.model';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}
  // storeData(recipes:Recipe[]){ or i can use another way to aviod arguments
  storeData() {
    const recipes = this.recipeService.getRecipes();
    // this is to add every recipe seperatly
    // this.http.post('https://ng-recipe-book-ef4a9-default-rtdb.firebaseio.com/recipes.json',recipes)
    //  but if i wanna override all the data i can use put method
    this.http
      .put(
        'https://ng-recipe-book-ef4a9-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchData() {
   return this.http
      .get<Recipe[]>(
        'https://ng-recipe-book-ef4a9-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipe(recipes);
        })
      );
    //I will subscribe in another service
    //   .subscribe((recipes) => {
    //     // console.log(recipes);
    //   });
  }
}
