/* tslint:disable */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../shared/models/user.model';
import {UserService} from '../../../shared/services/user/user.service';
import {Tier} from '../../../shared/models/tier';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateSubscription} from '../../../shared/models/create-subscription';

@Component({
  selector: 'app-tipschef-subscription',
  templateUrl: './tipschef-subscription.component.html',
  styleUrls: ['./tipschef-subscription.component.css']
})
export class TipschefSubscriptionComponent implements OnInit {
  username: string;
  user: User;
  tiers: Tier[];

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
      number_month: ['1', [Validators.required]]
    });
    this.loadUser();
    this.loadTiers();

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

  sub(tier: number): void {
    this.isLoading = true;
    const createSubscription: CreateSubscription = {
      subscribed_username: this.username,
      tier: tier,
      number_month: this.form.value.number_month
    };
    this.userService.createSubscription(createSubscription).subscribe(httpReturn => {
      if (httpReturn && httpReturn.body){
        this.router.navigate(['/' + this.username]);
      }
    }, error => {
      if (error && error.error && error.error['detail'] && error.error['detail'] === 'The user does not have payment method'){
        this.router.navigate(['/cook/payment-information']);
      }
    });
  }

}
