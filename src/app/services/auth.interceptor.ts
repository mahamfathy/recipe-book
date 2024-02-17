import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
// import { AuthService } from './auth.service';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const authService = inject(AuthService)
  const store = inject(Store<AppState>)
  // return authService.user.pipe(
  return store.select('auth').pipe(
    take(1),
    map(authSate=>{
     return authSate.user
    }),
    exhaustMap((user) => {
      if (!user) {
        return next(req)
      }
      const modifiedReq = req.clone({
        params: new HttpParams().set('auth', user.token as string),
      });
      return next(modifiedReq);
    })
  );
};
