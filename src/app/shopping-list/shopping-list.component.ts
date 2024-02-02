import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Ingredient } from '../shared/models/ingredients.models';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ShoppingEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private igChangeSubscription: Subscription = new Subscription();
  constructor(private shoppingService: ShoppingListService) {}
  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.igChangeSubscription =
      this.shoppingService.ingredientsChanged.subscribe(
        (ingred: Ingredient[]) => (this.ingredients = ingred)
      );
  }
  ngOnDestroy(): void {
    this.igChangeSubscription.unsubscribe();
  }
}
