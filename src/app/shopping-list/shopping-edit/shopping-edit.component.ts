import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Ingredient } from '../../shared/models/ingredients.models';
import { ShoppingListService } from '../../services/shopping-list.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  constructor(private shoppingService: ShoppingListService) {}
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
      this.shoppingService.updateIngredients(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingService.ingredientAdded(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear(){
    this.shoppingForm.reset()
    this.editMode=false
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
