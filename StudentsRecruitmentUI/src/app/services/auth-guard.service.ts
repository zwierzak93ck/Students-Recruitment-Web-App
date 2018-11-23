import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { }

  redirectUrl;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    const expectedType = route.data.expectedType;
    this._authService.getUserType();
    this._authService.checkData();
    this._authService.getUserName();
    if (this.checkLogin(url)) {
      return true;
    }
    return false;
  }

  checkLogin(url: string): boolean {
    if (this._authService.isLoggedIn) {
      return true;
    }
    this._authService.redirectUrl = url;
    this._router.navigate(['login']);
    return false;
  }


}
