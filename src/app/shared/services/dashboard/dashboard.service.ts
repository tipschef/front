import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ConstantsService} from '../constants/constants.service';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {Dashboard} from '../../models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient,
              private constantsService: ConstantsService,
              private authService: AuthService) { }


  getDashboardData(): Observable<HttpResponse<Array<Dashboard>>> {
    const url = this.constantsService.getConstant('USER_DASHBOARD');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };

    return this.http.get<Array<Dashboard>>(url + 'data/', {headers, observe: 'response'});

  }
}
