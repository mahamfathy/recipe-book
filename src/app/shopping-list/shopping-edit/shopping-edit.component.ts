import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Ingredient } from '../../shared/models/ingredients.models';
import { ShoppingListService } from '../../services/shopping-list.service';
import {
  FormControl,
  FormsModule,
  NgForm,
} from '@angular/forms';
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
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingService.ingredientAdded(newIngredient);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
