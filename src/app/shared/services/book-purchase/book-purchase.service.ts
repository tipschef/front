import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Dashboard} from "../../models/dashboard";
import {ConstantsService} from "../constants/constants.service";
import {AuthService} from "../auth/auth.service";
import {BookPurchase} from "../../models/book-purchase";

@Injectable({
  providedIn: 'root'
})
export class BookPurchaseService {

  constructor(private http: HttpClient,
              private constantsService: ConstantsService,
              private authService: AuthService) {
  }


  getPurchaseHistory(): Observable<HttpResponse<Array<BookPurchase>>> {
    const url = this.constantsService.getConstant('BOOK_PURCHASE');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };

    return this.http.get<Array<BookPurchase>>(url, {headers, observe: 'response'});

  }


  buy_book(book_id: number): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('BOOK_PURCHASE');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };

    return this.http.get<any>(url + '/' + book_id, {headers, observe: 'response'});

  }

  isAlreadyBought(bookId: number): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('BOOK_PURCHASE_CHECK');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };

    return this.http.get<any>(url + '/' + bookId, {headers, observe: 'response'});

  }
}
