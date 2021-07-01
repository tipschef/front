/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import {User} from '../../../shared/models/user.model';
import {Tier} from '../../../shared/models/tier';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../shared/services/user/user.service';
import {GiftSubscription} from '../../../shared/models/gift-subscription';

@Component({
  selector: 'app-gift-subscription',
  templateUrl: './gift-subscription.component.html',
  styleUrls: ['./gift-subscription.component.css']
})
export class GiftSubscriptionComponent implements OnInit {

  username: string;
  user: User;
  tiers: Tier[];
  availableFollowers: number;

  isLoading: boolean;

  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.username = this.route.snapshot.paramMap.get('username');

    this.form = this.formBuilder.group({
      number_sub: ['1', [Validators.required]]
    });
    this.loadUser();
    this.loadTiers();
    this.loadAvailableFollowers();
  }

  loadUser(): void {
    this.userService.getUserByUsername(this.username).subscribe(httpReturn => {
      if (httpReturn?.body) {
        this.user = httpReturn.body;
        this.isLoading = false;
      }
    });
  }

  loadTiers(): void {
    this.userService.getTiers().subscribe(httpReturn => {
      if (httpReturn?.body) {
        this.tiers = httpReturn.body;
      }
    });
  }

  loadAvailableFollowers(): void {
    this.userService.getAvailableFollowers(this.username).subscribe(httpReturn => {
      if (httpReturn?.body) {
        this.availableFollowers = httpReturn.body.available_followers;
      }
    });
  }

  giftSub(tier: number): void {
    this.isLoading = true;
    const giftSubscription: GiftSubscription = {
      subscribed_username: this.username,
      tier: tier,
      number: this.form.value.number_sub
    };
    this.userService.giftSubscription(giftSubscription).subscribe(httpReturn => {
      if (httpReturn && httpReturn.body){
        this.router.navigate(['/' + this.username]);
      }
    });
  }


}
