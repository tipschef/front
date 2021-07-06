import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ConstantsService} from '../constants/constants.service';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  constructor(private http: HttpClient,
              private constantsService: ConstantsService,
              private authService: AuthService) { }


  getHighlighted(): Observable<HttpResponse<Array<User>>> {
    const url = this.constantsService.getConstant('USER_HIGHLIGHT');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };

    return this.http.get<Array<User>>(url, {headers, observe: 'response'});

  }
}
