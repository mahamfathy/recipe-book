import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,

} from '@angular/common/http';
import { RecipeService } from './services/recipe.service';
import { authInterceptor } from './services/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    RecipeService,
    provideStore(reducers, { metaReducers })
],
};
