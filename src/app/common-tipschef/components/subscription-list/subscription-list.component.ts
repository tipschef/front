import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/services/user/user.service';
import {CreatedSubscription} from '../../../shared/models/created-subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

  ongoingSubscription: CreatedSubscription[];
  giftedSubscription: CreatedSubscription[];
  expiredSubscription: CreatedSubscription[];

  constructor(private userService: UserService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.initOngoing();
    this.initGifted();
    this.initExpired();
  }

  initOngoing(): void {
    this.userService.getOngoingSubscription().subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.ongoingSubscription = httpReturn.body;
      }
    });
  }

  initGifted(): void {
    this.userService.getGiftedSubscription().subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.giftedSubscription = httpReturn.body;
      }
    });
  }

  initExpired(): void {
    this.userService.getExpiredSubscription().subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.expiredSubscription = httpReturn.body;
      }
    });
  }


  subscribeUser(username: string): void {
    this.route.navigate(['/subscribe/' + username]);
  }

  giftSub(username: string): void {
    this.route.navigate(['/gift-subscription/' + username]);
  }

}
