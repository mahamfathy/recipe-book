import { Component, OnInit } from '@angular/core';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../shared/models/recipe.model';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeDetailsComponent,RecipeListComponent,FormsModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent  implements OnInit{
  recipeSelected!:Recipe
  constructor(){}
ngOnInit(): void {
  
}
}
