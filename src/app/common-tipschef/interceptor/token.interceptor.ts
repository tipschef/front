import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap(event => {
      return event;
    }, error => {
      if (error.status === 401 && error.error.detail === 'Token expired'){
        this.authService.disconnect();
        this.router.navigate(['/log-in'], {queryParams: {returnUrl: this.router.routerState.snapshot.url}});
      }
    }));
  }
}
