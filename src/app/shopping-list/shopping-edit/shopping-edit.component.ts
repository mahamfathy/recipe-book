import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredients.models';
import { ShoppingListService } from '../../services/shopping-list.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
// import * as fromShoppingList from '../../store/shopping-list.actions'
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  START_EDIT,
  STOP_EDIT,
  UPDATE_INGREDIENT,
} from '../../store/shopping-list.actions';
import { Observable } from 'rxjs-compat';
import { AppState } from '../../reducers';

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
  editedItem!: Ingredient;
  // startEditing? :Observable<number>
  constructor(
    private shoppingService: ShoppingListService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.edittedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          stateData.edittedIngredientIndex;
          this.shoppingForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
    // this.subscription = this.shoppingService.startEditing.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.shoppingService.getIngredient(index);
    //     this.shoppingForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount,
    //     });
    //   }
    // );
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
    this.store.dispatch(STOP_EDIT());
  }
  onDelete() {
    // this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(DELETE_INGREDIENT());
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(STOP_EDIT());
  }
}
