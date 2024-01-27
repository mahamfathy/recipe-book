import { Component, OnInit } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../shared/models/recipe.model';
import { RecipeDetailComponent } from './recipe-details/recipe-details.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeDetailComponent,RecipeListComponent,FormsModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent  implements OnInit{
  recipeSelected!:Recipe
  constructor(){}
ngOnInit(): void {
  
}
}
