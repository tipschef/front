import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ConstantsService} from '../constants/constants.service';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {TemplateList} from '../../models/template-list';
import {Recipe} from '../../models/recipe';
import {Media} from '../../models/media';
import {Book} from '../../models/book';
import {CreatedBook} from '../../models/created-book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient,
              private constantsService: ConstantsService,
              private authService: AuthService) { }


  getBookTemplate(): Observable<HttpResponse<TemplateList>> {
    const url = this.constantsService.getConstant('BOOK_TEMPLATE');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<TemplateList>(url, {headers, observe: 'response'});
  }

  getMyBooks(): Observable<HttpResponse<Array<CreatedBook>>> {
    const url = this.constantsService.getConstant('BOOK_CREATOR');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.get<Array<CreatedBook>>(url, {headers, observe: 'response'});
  }

  deleteBook(bookId: number): Observable<HttpResponse<any>>{
    const url = this.constantsService.getConstant('BOOK');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.delete<any>(url + bookId, {headers, observe: 'response'});
  }

  initBook(): Book {
    return {
      name: '',
      description: '',
      cover_path: '',
      description_path: '',
      recipe_template: [],
    };
  }

  preview(html: string): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('BOOK_PREVIEW');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    console.log(html);
    // tslint:disable-next-line
    return this.http.post<any>(url, {'html': html}, {headers, observe: 'response'});
  }

  postCover(cover: File): Observable<HttpResponse<Media>> {
    const url = this.constantsService.getConstant('BOOK_COVER');
    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    const formData: FormData = new FormData();
    formData.append('cover', cover);

    return this.http.post<Media>(url, formData, {headers, observe: 'response'});
  }

  postBook(book: Book): Observable<HttpResponse<any>> {
    const url = this.constantsService.getConstant('BOOK_BROKER');

    const headers = {
      Authorization: `Bearer ${this.authService.authData.access_token}`
    };
    return this.http.post<any>(url, book, {headers, observe: 'response'});
  }
}
