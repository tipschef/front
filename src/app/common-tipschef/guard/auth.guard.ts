import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../shared/services/auth/auth.service';
import {LocalStorageService} from '../../shared/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router,
              private authService: AuthService,
              private localStorageService: LocalStorageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles = route.data.roles as Array<string>;

    return new Promise((resolve, reject) => {
      const localStorageUser = this.localStorageService.get('currentUser');

      const authData = this.authService.authData;
      if (!authData) {
        if (localStorageUser != null) {
          this.authService.authData = localStorageUser;
        } else {
          this.router.navigate(['/log-in'], {queryParams: {returnUrl: state.url}});
          resolve(false);
        }
      }

      this.authService.updateUserRoles().then(() => {
        if (roles === undefined) {
          resolve(true);
        }

        this.authService.getUserRoles().subscribe(httpResponse => {

            if (roles !== undefined) {
              // tslint:disable-next-line:forin
              for (const role of roles) {
                if (role === 'cook' && !httpResponse.body.is_cook) {
                  resolve(false);
                }
                if (role === 'admin' && !httpResponse.body.is_admin) {
                  resolve(false);
                }
                if (role === 'partner' && !httpResponse.body.is_partner) {
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
    });
  }

}
