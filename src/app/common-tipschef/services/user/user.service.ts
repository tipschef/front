/* tslint:disable:object-literal-shorthand */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ConstantsService} from '../constants/constants.service';
import {Observable} from 'rxjs';
import {User} from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private constantsService: ConstantsService) {
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
}
