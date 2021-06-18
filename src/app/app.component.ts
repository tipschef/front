import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TipsChef';


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  /*get is_cook(): boolean {
    return this.authService.is_cook();
  }*/
}
