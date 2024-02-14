import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './services/auth.guard';
import { recipesResolver } from './recipes.resolver';

export const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate:[authGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        // resolve: [recipesResolver],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        // resolve : [recipesResolver]
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component:AuthComponent},
  // { path: '**', redirectTo: 'recipes', pathMatch: 'full' },
];
