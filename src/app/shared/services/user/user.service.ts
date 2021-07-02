/* tslint:disable:object-literal-shorthand */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ConstantsService} from '../constants/constants.service';
import {Observable} from 'rxjs';
import {User} from '../../models/user.model';
import {AuthService} from '../auth/auth.service';
import {CreateSubscription} from '../../models/create-subscription';
import {Tier} from '../../models/tier';
import {GiftSubscription} from '../../models/gift-subscription';
import {CreatedSubscription} from '../../models/created-subscription';

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


  createSubscription(createSubscription: CreateSubscription): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('USER_SUBSCRIPTION');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.post<any>(url, createSubscription, {headers, observe: 'response'});
  }
  giftSubscription(createSubscription: GiftSubscription): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('USER_SUBSCRIPTION_GIFT');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.post<any>(url, createSubscription, {headers, observe: 'response'});
  }

  getOngoingSubscription(): Observable<HttpResponse<Array<CreatedSubscription>>> {
    const url = this.constantsService.getConstant('USER_SUBSCRIPTION_ONGOING');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<Array<CreatedSubscription>>(url, {headers, observe: 'response'});
  }

  getGiftedSubscription(): Observable<HttpResponse<Array<CreatedSubscription>>> {
    const url = this.constantsService.getConstant('USER_SUBSCRIPTION_GIFTED');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<Array<CreatedSubscription>>(url, {headers, observe: 'response'});
  }

  getExpiredSubscription(): Observable<HttpResponse<Array<CreatedSubscription>>> {
    const url = this.constantsService.getConstant('USER_SUBSCRIPTION_EXPIRED');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<Array<CreatedSubscription>>(url, {headers, observe: 'response'});
  }

  updateUser(user: User): Observable<HttpResponse<User>> {
    const url = this.constantsService.getConstant('USER_UPDATE');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.patch<User>(url + 'data', user, {headers, observe: 'response'});
  }

  getUserById(userId: number): Observable<HttpResponse<User>> {
    const url = this.constantsService.getConstant('USER_ID');
    return this.http.get<User>(url + userId, {observe: 'response'});
  }

  getAvailableFollowers(username: string): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('USER_AVAILABLE_FOLLOWERS');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<any>(url + '/' + username, {headers, observe: 'response'});
  }

  getMe(): Observable<HttpResponse<User>> {
    const url = this.constantsService.getConstant('USER');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<User>(url + 'me', {headers, observe: 'response'});

  }


  getUserByUsername(username: string): Observable<HttpResponse<User>> {
    const url = this.constantsService.getConstant('USER');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<User>(url + username + '/', {headers, observe: 'response'});
  }

  followUser(username: string): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('USER');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<any>(url + username + '/follow/', {headers, observe: 'response'});
  }

  unfollowUser(username: string): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('USER');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<any>(url + username + '/unfollow/', {headers, observe: 'response'});
  }

  getSearchUser(username: string): Observable<HttpResponse<Array<User>>> {
    const url = this.constantsService.getConstant('USER_SEARCH');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<Array<User>>(url + '?username=' + username, {headers, observe: 'response'});
  }

  getTiers(): Observable<HttpResponse<Array<Tier>>> {
    const url = this.constantsService.getConstant('USER_SUBSCRIPTION_TIER');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<Array<Tier>>(url, {headers, observe: 'response'});
  }

  updateProfilePicture(file: File): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('USER_UPDATE');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.patch<any>(url + 'profile', formData, {headers, observe: 'response'});
  }

  updateBackgroundPicture(file: File): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('USER_UPDATE');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.patch<any>(url + 'background', formData, {headers, observe: 'response'});
  }

}
