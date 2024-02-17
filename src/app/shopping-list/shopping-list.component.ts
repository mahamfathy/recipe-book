import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Ingredient } from '../shared/models/ingredients.models';
import { ShoppingListService } from '../services/shopping-list.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { START_EDIT } from './store/shopping-list.actions';
import { AppState } from '../reducers';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ShoppingEditComponent, FormsModule, CommonModule],
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!:Observable<{ingredients: Ingredient[]}>;
  // private igChangeSubscription: Subscription = new Subscription();
  constructor(
    private shoppingService: ShoppingListService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
  this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingService.getIngredients();
    // this.igChangeSubscription =
    //   this.shoppingService.ingredientsChanged.subscribe(
    //     (ingred: Ingredient[]) => (this.ingredients = ingred)
    //   );
  }
  onEditItem(i: number) {
    // this.shoppingService.startEditing.next(i);
    this.store.dispatch(START_EDIT({index:i}))
  }
  ngOnDestroy(): void {
    // this.igChangeSubscription.unsubscribe();
  }
}
