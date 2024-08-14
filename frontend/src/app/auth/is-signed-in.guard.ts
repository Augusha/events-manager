import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const isSignedInGuard:
  CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuth.value) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
