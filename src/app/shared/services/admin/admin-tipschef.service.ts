import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ConstantsService} from '../constants/constants.service';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {UserAdmin} from '../../models/user-admin';

@Injectable({
  providedIn: 'root'
})
export class AdminTipschefService {

  constructor(private http: HttpClient,
              private constantsService: ConstantsService,
              private authService: AuthService) { }


  getUsers(): Observable<HttpResponse<Array<UserAdmin>>> {
    const url = this.constantsService.getConstant('ADMIN_USERS');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<Array<UserAdmin>>(url, {headers, observe: 'response'});
  }

  setAdmin(userId: number): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('ADMIN_ADMIN_ADD');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.patch<any>(url + '/' + userId, {}, {headers, observe: 'response'});
  }

  setPartner(userId: number): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('ADMIN_PARTNER_ADD');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.patch<any>(url + '/' + userId, {},  {headers, observe: 'response'});
  }

  setHighlighted(userId: number): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('ADMIN_HIGHLIGHT_ADD');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.patch<any>(url + '/' + userId, {},  {headers, observe: 'response'});
  }

  removeHighlighted(userId: number): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('ADMIN_HIGHLIGHT_REMOVE');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.patch<any>(url + '/' + userId, {},  {headers, observe: 'response'});
  }

}
