import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isAuth = false;
  constructor(public authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.isAuth = this.authService.getAuth();
    if (!this.isAuth) {
      this.router.navigate(['/signin']);
    }
    this.authService.authStatusListener$.subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
    return true;
  }
}
