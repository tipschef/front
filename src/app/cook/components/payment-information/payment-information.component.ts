import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentService} from '../../../shared/services/payment/payment.service';
import {PaymentMethod} from '../../../shared/models/payment_method';

@Component({
  selector: 'app-payment-information',
  templateUrl: './payment-information.component.html',
  styleUrls: ['./payment-information.component.css']
})
export class PaymentInformationComponent implements OnInit {
  firstFormGroup: FormGroup;
  paymentMethod: PaymentMethod;
  show = false;
  cardNumber: string;
  minExp: number;

  isLoading: boolean;


  constructor(private formBuilder: FormBuilder,
              private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.minExp = new Date().getFullYear();

    this.paymentService.getPaymentMethod().subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.isLoading = false;
        this.show = true;
        this.cardNumber = httpReturn.body.card_number;
      }
    }, error => {
      this.isLoading = false;
    });

    this.paymentMethod = {} as PaymentMethod;
    this.firstFormGroup = this.formBuilder.group({
      card_number: ['', [Validators.required, Validators.pattern('^\\d+$')]],
      card_month: ['', [Validators.required]],
      card_year: ['', [Validators.required]],
      card_cvd: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^\\d+$')]],
    });
  }

  onSubmit(): void {
    if (this.firstFormGroup.valid) {
      this.paymentMethod.number = this.firstFormGroup.value.card_number.toString();
      this.paymentMethod.exp_month = this.firstFormGroup.value.card_month;
      this.paymentMethod.exp_year = this.firstFormGroup.value.card_year;
      this.paymentMethod.cvc = this.firstFormGroup.value.card_cvd;
      this.paymentService.createPaymentMethod(this.paymentMethod).subscribe(httpReturn => {
        if (httpReturn && httpReturn.body) {
          this.show = true;
        }
      });
    }

  }

  delete(): void {
    this.paymentService.deletePaymentMethod().subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.show = false;
      }
    });
  }

}
