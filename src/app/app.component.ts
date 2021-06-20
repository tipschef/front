import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TipsChef';
  firstFormGroup: FormGroup;
  userSearch: string;


  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      search: [this.userSearch]
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  /*get is_cook(): boolean {
    return this.authService.is_cook();
  }*/

  get username(): string {
    if (this.authService.userRoles && this.authService.userRoles.username){
      return this.authService.userRoles.username;
    }
    return '';
  }
  disconnect(): void {
    this.authService.disconnect();
    this.router.navigate(['/log-in'], {queryParams: {returnUrl: '/home'}});
  }

  search(): void {
    this.router.navigate(['/search'], {queryParams: {username: this.firstFormGroup.value.search}});
  }
}
