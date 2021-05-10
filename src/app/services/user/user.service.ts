import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
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

  getUser(): Observable<HttpResponse<User>> {
    const url = this.constantsService.getConstant('USER');
    return this.http.get<User>(url, {observe: 'response'});
  }

  createUser(user: User): Observable<HttpResponse<User>> {
    const url = this.constantsService.getConstant('USER');
    console.log(url);
    return this.http.post<User>(url, user, {observe: 'response'});
  }

  updateUser(user: User): Observable<HttpResponse<User>> {
    const url = this.constantsService.getConstant('USER');
    return this.http.put<User>(url, user, {observe: 'response'});
  }
}
