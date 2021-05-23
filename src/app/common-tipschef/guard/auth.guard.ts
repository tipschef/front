import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {rejects} from 'assert';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles = route.data.roles as Array<string>;
    const authData = this.authService.authData;
    if (!authData) {
      this.router.navigate(['/log-in'], {queryParams: {returnUrl: state.url}});
      return false;
    }

    if (roles === undefined) {
      return true;
    }

    return new Promise((resolve, reject) => {
      this.authService.getUserRoles().subscribe(httpResponse => {
          if (roles !== undefined) {
            // tslint:disable-next-line:forin
            for (const role in roles) {
              if (role === 'cook' && !httpResponse.body.is_cook) {
                resolve(false);
              }
              if (role === 'admin' && !httpResponse.body.is_admin) {
                resolve(false);
              }
            }
            resolve(true);
          }
          resolve(false);
        },
        error => {
          reject(false);
        });
    });


  }

}
