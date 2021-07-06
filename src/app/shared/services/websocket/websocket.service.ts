import {Injectable, OnDestroy} from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {Observable} from 'rxjs';
import {webSocket} from 'rxjs/webSocket';
import {ConstantsService} from '../constants/constants.service';
import {AuthService} from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  connection$: WebSocketSubject<any>;

  constructor(private constantsService: ConstantsService,
              private authService: AuthService) {
  }

  connect(userId: number): Observable<any> {
    this.connection$ = webSocket({
      url: `${this.constantsService.getWebsocketConstant()}/${userId}/${this.authService.authData.access_token}`,
      deserializer: msg => msg
    });
    return this.connection$;
  }

  send(data: any): void {
    if (this.connection$) {
      this.connection$.next(data);
    } else {
      console.log('Did not send data, unable to open connection');
    }
  }

  closeConnection(): void {
    if (this.connection$) {
      this.connection$.complete();
      this.connection$ = null;
    }
  }

  ngOnDestroy(): void {
    this.closeConnection();
  }
}
