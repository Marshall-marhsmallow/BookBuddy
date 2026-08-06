import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './Apis';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const requiresAuth = route.data['requiresAuth'] ?? true;

    return this.authService.checkAuth().pipe(
      map((isLoggedIn: boolean) => {
        if (requiresAuth) {
          return isLoggedIn ? true : this.router.createUrlTree(['/login']);
        } else {
          return !isLoggedIn ? true : this.router.createUrlTree(['/profile']);
        }
      })
    );
  }
}