import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailComponent implements OnInit{
 @Input() recipe!:Recipe
  constructor(){

  }
ngOnInit(): void {
  
}


}
