import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredients.models';
import { ShoppingListService } from '../../services/shopping-list.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  UPDATE_INGREDIENT,
} from '../../store/shopping-list.actions';
import { Observable } from 'rxjs-compat';
import { State } from '../../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;
  startEditing? :Observable<number>
  constructor(
    private shoppingService: ShoppingListService,
    private store: Store<State>
  ) {}
  ngOnInit(): void {
    this.subscription = this.shoppingService.startEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingService.updateIngredients(
      //   this.editedItemIndex,
      //   newIngredient
      // );
      this.store.dispatch(
        UPDATE_INGREDIENT({
          index: this.editedItemIndex,
          ingredient: newIngredient,
        })
      );
    } else {
      // this.shoppingService.ingredientAdded(newIngredient);
      this.store.dispatch(ADD_INGREDIENT({ ingredients: [newIngredient] }));
      console.log(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }
  onDelete() {
    // this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(DELETE_INGREDIENT({ index: this.editedItemIndex }));
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
