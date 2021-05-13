/* tslint:disable:object-literal-shorthand */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {ConstantsService} from '../constants/constants.service';
import {Observable} from 'rxjs';
import {AuthData} from '../../models/auth/auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authData: AuthData = null;

  constructor(private http: HttpClient,
              private constantsService: ConstantsService) {
  }


  authenticate(username: string, password: string): Observable<HttpResponse<AuthData>> {
    const url = this.constantsService.getConstant('AUTH_TOKEN');
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<AuthData>(url, body.toString(), {
      observe: 'response', headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
}
