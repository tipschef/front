import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/services/user/user.service';
import {User} from '../../../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
