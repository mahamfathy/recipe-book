import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
} from '@angular/core';
import { Ingredient } from '../../shared/models/ingredients.models';
import { ShoppingListService } from '../../services/shopping-list.service';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrls:[ './shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingService:ShoppingListService) {}
  ngOnInit(): void {}
  onAddItem(form:NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingService.ingredientAdded(newIngredient)
  }
}
