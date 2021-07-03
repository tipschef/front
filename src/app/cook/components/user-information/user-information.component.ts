/* tslint:disable */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {UserService} from "../../../shared/services/user/user.service";
import {User} from "../../../shared/models/user.model";
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})

export class UserInformationComponent implements OnInit {
  hide = true;
  user: User;
  profilePicture: {};
  backgroundPicture: {};
  firstFormGroup: FormGroup;


  constructor(private authService: AuthService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getUserData();
  }

  initForm(): void {
    this.firstFormGroup = this.formBuilder.group({
      user_email: [this.user.email, [Validators.required, Validators.email]],
      user_username: [this.user.username, [Validators.maxLength(50)]],
      user_description: [this.user.description, [Validators.maxLength(120)]],
      user_firstname: [this.user.firstname, [Validators.maxLength(50)]],
      user_lastname: [this.user.lastname, [Validators.maxLength(50)]],
      user_password: ['', [Validators.maxLength(50)]],
    });
  }

  getUserData(): void{
    this.userService.getMe().subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.user = httpReturn.body;
        this.initForm();
      }
    });
  }


  addProfilePicture(event: any): void {
    const files = event.target.files;
    if (files.length === 0) {
      return;
    }

    let reader;

    for (const key in files) {
      if (!files.hasOwnProperty(key)) {
        continue;
      }

      const file = files[key];
      if ( (file.size / 1024) / 1024 > 30) {
        this.snackBar.open('Fichier trop volumineux, taille maximum acceptée 30Mo', 'Fermer');
        return ;
      }
      reader = new FileReader();
      reader.readAsDataURL(file);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => {
        this.profilePicture = {'data': file, 'path': reader.result, 'is_created': false};
        console.log(this.profilePicture);
      };
    }
  }

  addBackgroundPicture(event: any): void {
    const files = event.target.files;
    if (files.length === 0) {
      return;
    }

    let reader;

    for (const key in files) {
      if (!files.hasOwnProperty(key)) {
        continue;
      }

      const file = files[key];
      if ( (file.size / 1024) / 1024 > 30) {
        this.snackBar.open('Fichier trop volumineux, taille maximum acceptée 30Mo', 'Fermer');
        return ;
      }
      reader = new FileReader();
      reader.readAsDataURL(file);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => {
        this.backgroundPicture = {'data': file, 'path': reader.result, 'is_created': false};
      };
    }
  }

  onSubmit(): void {
    this.user.username = this.firstFormGroup.value.user_username;
    this.user.lastname = this.firstFormGroup.value.user_lastname;
    this.user.firstname = this.firstFormGroup.value.user_firstname;
    this.user.email = this.firstFormGroup.value.user_email;
    this.user.description = this.firstFormGroup.value.user_description;
    this.user.password = this.firstFormGroup.value.user_password;
    console.log(this.user);

    this.userService.updateUser(this.user).subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        if(this.profilePicture !== undefined){
          this.userService.updateProfilePicture(this.profilePicture['data']).subscribe(httpReturn => {
            if (httpReturn && httpReturn.body) {
            }
          })
        }
        if(this.backgroundPicture !== undefined){
          this.userService.updateBackgroundPicture(this.backgroundPicture['data']).subscribe(httpReturn => {
            if (httpReturn && httpReturn.body) {
            }
          })
        }
        this.getUserData()
      }
    });
  }


}
