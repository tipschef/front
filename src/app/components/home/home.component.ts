import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/user/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const user: User = {
      email: 'test@test.fr',
      password: 'test'
    };
    this.userService.createUser(user).subscribe( httpReturn => {
      console.log(httpReturn);
    });
  }

}
