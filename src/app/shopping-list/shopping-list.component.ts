import { Component, OnInit } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Ingredient } from '../shared/models/ingredients.models';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ShoppingEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomato', 10),
  ];
  constructor() {}
  ngOnInit(): void {}
  onIngredientAdded(Ingredient: Ingredient) {
    this.ingredients.push(Ingredient);
  }
}
