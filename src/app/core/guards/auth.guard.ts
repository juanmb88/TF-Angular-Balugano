import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, pipe } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  console.log("se disparo mioddleware!!!!!")
  //como hacer una redirect
  const router = inject(Router);
  const authService = inject(AuthService);

  //return router.createUrlTree(['auth','login']);
  return authService.isAuthenticated().pipe(
    map(isAuthenticated =>{
      if(!isAuthenticated){
        return  router.createUrlTree(['auth','login']);
      }else{
        return isAuthenticated;
      }
    })
  )
};
