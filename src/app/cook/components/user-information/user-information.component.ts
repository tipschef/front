import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {UserService} from "../../../shared/services/user/user.service";
import {User} from "../../../shared/models/user.model";

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})

export class UserInformationComponent implements OnInit {
  hide = true;
  user: User;

  constructor(private authService: AuthService,
              private userService: UserService) {
  }

  ngOnInit(): void {
      this.userService.getMe().subscribe(httpReturn => {
        if (httpReturn && httpReturn.body) {
          this.user = httpReturn.body;
          console.log(this.user.username)
        }
      });
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
