import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { DropdownDirective } from '../../shared/models/dropdown.directive';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [DropdownDirective],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailComponent implements OnInit{
 @Input() recipe!:Recipe
  constructor(private recipeService:RecipeService){

  }
ngOnInit(): void {
  
}
onAddShoppingList(){
this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
}

}
