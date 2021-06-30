import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ConstantsService} from "../constants/constants.service";
import {AuthService} from "../auth/auth.service";
import {Recipe} from "../../models/recipe";
import {Observable} from "rxjs";
import {AccountPayment} from "../../models/account_payment";
import {PaymentMethod} from "../../models/payment_method";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient,
              private constantsService: ConstantsService,
              private authService: AuthService) {
  }

  createAccount(account: AccountPayment): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('PAYMENT_ACCOUNT');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };

    return this.http.post<any>(url + "create/", account, {headers, observe: 'response'});
  }

  createBankAccount(iban: string): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('PAYMENT_BANK_ACCOUNT');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };

    return this.http.post<any>(url + "create/", {'iban': iban}, {headers, observe: 'response'});
  }

  getAccount(): Observable<HttpResponse<AccountPayment>> {
    const url = this.constantsService.getConstant('PAYMENT_ACCOUNT');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };

    return this.http.get<AccountPayment>(url, {headers, observe: 'response'});

  }

  createPaymentMethod(payment_method: PaymentMethod): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('PAYMENT_PAYMENT_METHOD');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };

    return this.http.post<any>(url + "create/", payment_method, {headers, observe: 'response'});
  }

  getPaymentMethod(): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('PAYMENT_PAYMENT_METHOD');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };

    return this.http.get<any>(url, {headers, observe: 'response'});

  }

  deletePaymentMethod(): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('PAYMENT_PAYMENT_METHOD');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };

    return this.http.delete<any>(url, {headers, observe: 'response'});

  }

  uploadId(file: File): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('PAYMENT_ACCOUNT');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    let formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(url +'id', formData, {headers, observe: 'response'});
  }

  deleteAccount(): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('PAYMENT_ACCOUNT');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };

    return this.http.delete<any>(url, {headers, observe: 'response'});

  }

}
