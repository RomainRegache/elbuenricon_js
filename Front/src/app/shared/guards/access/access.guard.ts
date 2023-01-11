import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {

  constructor(private _auth: AuthService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (route.data?.requiresLogin) {
      if (this._auth.isConnected()) {
        return true;
      } else {
        this._router.navigate(['/login']);
        return false;
      }
    }
    
    if (route.data?.redirectIfSignedIn) {
      if (this._auth.isConnected()) {
        this._router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }

    this._router.navigate(['/home']);
    return false;
  }
}
