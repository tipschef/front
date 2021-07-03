/* tslint:disable:object-literal-shorthand object-literal-key-quotes */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {ConstantsService} from '../constants/constants.service';
import {Observable} from 'rxjs';
import {AuthData} from '../../models/auth-data.model';
import {UserRoles} from '../../models/user-roles';
import {map} from 'rxjs/operators';
import {LocalStorageService} from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authData: AuthData = null;
  userRoles: UserRoles = null;

  constructor(private http: HttpClient,
              private constantsService: ConstantsService,
              private localStorageService: LocalStorageService) {
  }

  isLoggedIn(): boolean {
    return this.authData != null;
  }

  disconnect(): void {
    this.localStorageService.remove('currentUser');
    this.authData = null;
    this.authData = null;
  }


  authenticate(username: string, password: string): Observable<any> {
    const url = this.constantsService.getConstant('AUTH_TOKEN');
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post<AuthData>(url, body.toString(), {
      observe: 'response', headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }).pipe(map(user => {
      this.authData = user.body;
      this.localStorageService.set('currentUser', user.body);
      this.updateUserRoles();
    }));
  }

  updateUserRoles(): void {
    this.getUserRoles().subscribe(httpResponse => {
      this.userRoles = httpResponse.body;
    });
  }

  is_cook(): boolean {
    return this.userRoles !== undefined && this.userRoles?.is_cook;
  }

  is_partner(): boolean {
    return this.userRoles !== undefined && this.userRoles?.is_partner;
  }

  getUserRoles(): Observable<HttpResponse<UserRoles>> {
    const url = this.constantsService.getConstant('AUTH');
    const headers = {
      'Authorization': `Bearer ${this.authData.access_token}`
    };
    return this.http.get<UserRoles>(url, {headers: headers, observe: 'response'});
  }
}
