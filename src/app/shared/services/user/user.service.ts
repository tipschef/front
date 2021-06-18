/* tslint:disable:object-literal-shorthand */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ConstantsService} from '../constants/constants.service';
import {Observable} from 'rxjs';
import {User} from '../../models/user.model';
import {Recipe} from '../../models/recipe';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private constantsService: ConstantsService,
              private authService: AuthService) {
  }

  createUser(email: string, username: string, password: string): Observable<HttpResponse<User>> {
    const url = this.constantsService.getConstant('USER');
    const user: User = {
      email: email,
      username: username,
      password: password
    };
    return this.http.post<User>(url, user, {observe: 'response'});
  }

  updateUser(user: User): Observable<HttpResponse<User>> {
    const url = this.constantsService.getConstant('USER');
    return this.http.put<User>(url, user, {observe: 'response'});
  }

  getUserById(userId: number): Observable<HttpResponse<User>> {
    const url = this.constantsService.getConstant('USER_ID');
    return this.http.get<User>(url + userId + '/', {observe: 'response'});
  }


  getUserByUsername(username: string): Observable<HttpResponse<User>>{
    const url = this.constantsService.getConstant('USER');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<User>(url + username + '/', {headers, observe: 'response'});
  }
}
