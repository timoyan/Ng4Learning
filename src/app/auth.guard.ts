import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  /**
   *
   */
  constructor(private route: Router, private authService: AuthService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(state);

    if (state.url === '/login' || state.url === '/404') {
      return true;
    }

    if (!this.authService.isLoggedIn.value) {
      this.route.navigate(['/login']);
      return false;
    }

    return true;
  }
}
