import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TipsChef';


  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  /*get is_cook(): boolean {
    return this.authService.is_cook();
  }*/

  get username(): string {
    return this.authService.userRoles.username;
  }
  disconnect(): void {
    this.authService.disconnect();
    this.router.navigate(['/log-in'], {queryParams: {returnUrl: '/home'}});
  }
}
