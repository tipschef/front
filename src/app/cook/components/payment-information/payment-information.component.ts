import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaymentService} from "../../../shared/services/payment/payment.service";
import {PaymentMethod} from "../../../shared/models/payment_method";

@Component({
  selector: 'app-payment-information',
  templateUrl: './payment-information.component.html',
  styleUrls: ['./payment-information.component.css']
})
export class PaymentInformationComponent implements OnInit {
  firstFormGroup: FormGroup;
  payment_method: PaymentMethod;
  show: boolean = false
  card_number: string
  min_exp: number


  constructor(private formBuilder: FormBuilder,
              private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.min_exp = new Date().getFullYear()

    this.paymentService.getPaymentMethod().subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
          this.show = true;
          this.card_number = httpReturn.body.card_number
      }
    });

    this.payment_method = {} as PaymentMethod
    this.firstFormGroup = this.formBuilder.group({
      card_number: ['', [Validators.required, Validators.pattern("^\d+$")]],
      card_month: ['', [Validators.required]],
      card_year: ['', [Validators.required]],
      card_cvd: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern("^\d+$")]],
    });
  }

  onSubmit() {
    if ( this.firstFormGroup.valid){
      this.payment_method.number = this.firstFormGroup.value.card_number.toString();
      this.payment_method.exp_month = this.firstFormGroup.value.card_month;
      this.payment_method.exp_year = this.firstFormGroup.value.card_year;
      this.payment_method.cvc = this.firstFormGroup.value.card_cvd;
      this.paymentService.createPaymentMethod(this.payment_method).subscribe(httpReturn => {
        if (httpReturn && httpReturn.body) {
          console.log('Account created');
        }
      });
    }

  }

  delete(){
    this.paymentService.deletePaymentMethod().subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.show = false;
      }
    });
  }

}