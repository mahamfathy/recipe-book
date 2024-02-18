import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthService } from './services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
import { AUTO_LOGIN_ACTION } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    RecipesComponent,
    ShoppingListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'recipe-book';
  constructor(private authService:AuthService,private store:Store<AppState>){}
  ngOnInit(): void {
    // this.authService.autoLogin()
    this.store.dispatch(AUTO_LOGIN_ACTION())
  }
}
