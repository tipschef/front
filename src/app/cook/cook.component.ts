import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-cook',
  templateUrl: './cook.component.html',
  styleUrls: ['./cook.component.css']
})
export class CookComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }
  get isPartner(): boolean {
    return this.authService.userRoles.is_partner;
  }

}
