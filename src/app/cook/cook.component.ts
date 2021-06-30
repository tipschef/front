import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth/auth.service";

@Component({
  selector: 'app-cook',
  templateUrl: './cook.component.html',
  styleUrls: ['./cook.component.css']
})
export class CookComponent implements OnInit {
  is_partner: boolean

  constructor(private authService: AuthService) {
    this.is_partner = authService.is_partner()
  }

  ngOnInit(): void {
  }

}
