import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
} from '@angular/core';
import { Ingredient } from '../../shared/models/ingredients.models';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [],
  templateUrl: './shopping-edit.component.html',
  styleUrls:[ './shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef!: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef!: ElementRef;
  constructor(private shoppingService:ShoppingListService) {}
  ngOnInit(): void {}
  onAddItem(event: any) {
    event.preventDefault();
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.shoppingService.ingredientAdded(newIngredient)
  }
}
