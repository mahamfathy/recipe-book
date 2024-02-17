import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';

export const authGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService);
  const store = inject(Store<AppState>);
  const router = inject(Router);
  // return authService.user.pipe(
  return store.select('auth').pipe(
    take(1),
    map(authState=> 
      authState.user),
    map((user) => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      } else {
        return router.createUrlTree(['/auth']);
      }
    })
  );
};
