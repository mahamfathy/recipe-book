import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../../shared/models/recipe.model';


@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent,CommonModule,FormsModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
 @Output() recipeWasSelected =new EventEmitter<Recipe>()
recipes :Recipe[]=[
  new Recipe("a test", "this is the first test","https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg"),
  new Recipe("another test", "this is the first test","https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg")
];
constructor(){
}
ngOnInit(): void {
  
}

onRecipeSelected(recipe:Recipe){
this.recipeWasSelected.emit(recipe)
}
}
