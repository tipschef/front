import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;
      this.userService.createUser(email, username, password).subscribe(authData => {
          this.router.navigate(['/log-in']);
        },
        error => {
          this.loginInvalid = true;
        });
    } else {
      this.formSubmitAttempt = true;
    }

  }
}
