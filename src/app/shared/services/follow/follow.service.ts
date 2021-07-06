import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ConstantsService} from '../constants/constants.service';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {Follow} from '../../models/follow';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient,
              private constantsService: ConstantsService,
              private authService: AuthService) { }

  getFollows(): Observable<HttpResponse<Array<Follow>>> {
    const url = this.constantsService.getConstant('USER_FOLLOW');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };

    return this.http.get<Array<Follow>>(url, {headers, observe: 'response'});

  }
}
