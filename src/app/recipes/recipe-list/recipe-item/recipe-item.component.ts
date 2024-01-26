import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../../shared/models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: Recipe;
 @Output()  recipeSelected = new EventEmitter<void>()
  constructor() {}
  ngOnInit(): void {}

onSelected(){
this.recipeSelected.emit()
}

}
