import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

export const routes: Routes = [

{path:'recipes',component:RecipesComponent},
{path:'shopping-list',component:ShoppingListComponent},
{path:'**',redirectTo:'recipes',pathMatch:'full'},




];
