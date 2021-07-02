/* tslint:disable */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {PaymentService} from '../../../shared/services/payment/payment.service';
import {AccountPayment} from '../../../shared/models/account_payment';

@Component({
  selector: 'app-bank-account-information',
  templateUrl: './bank-account-information.component.html',
  styleUrls: ['./bank-account-information.component.css']
})
export class BankAccountInformationComponent implements OnInit {
  firstFormGroup: FormGroup;
  accountPayment: AccountPayment;
  maxDate: Date;
  idRecto: {};
  idVerso: {};
  show = false;
  isLoading: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private paymentService: PaymentService) {
    this.maxDate = new Date(new Date().getFullYear() - 13, 0, 1);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.paymentService.getAccount().subscribe(httpReturn => {
      if (httpReturn && httpReturn.body) {
        this.isLoading = false;
        this.accountPayment = httpReturn.body;
        this.show = true;

      }
    }, error => {
      this.isLoading = false;
      this.accountPayment = {} as AccountPayment;
      this.firstFormGroup = this.formBuilder.group({
        bank_firstname: ['', [Validators.required]],
        bank_lastname: ['', [Validators.required]],
        bank_email: ['', [Validators.required, Validators.email]],
        bank_city: ['', [Validators.required]],
        bank_country: ['', [Validators.required]],
        bank_postal_code: ['', [Validators.required, Validators.pattern('^\d+$')]],
        bank_address: ['', [Validators.required]],
        bank_birthdate: ['', [Validators.required]],
        bank_gender: ['', [Validators.required]],
        bank_phone: ['', [Validators.required]],
        bank_iban: ['', [Validators.required]],
      });
    });


  }


  onSubmit(): void {
    if ( this.firstFormGroup.valid){
      const birthdate = this.firstFormGroup.value.bank_birthdate.getFullYear() + '-' + this.firstFormGroup.value.bank_birthdate.getMonth() + '-' + this.firstFormGroup.value.bank_birthdate.getDate();
      const phone = this.firstFormGroup.value.bank_phone[0] === '0' ? '+33' +
        this.firstFormGroup.value.bank_phone : this.firstFormGroup.value.bank_phone;
      this.accountPayment.first_name = this.firstFormGroup.value.bank_firstname;
      this.accountPayment.last_name = this.firstFormGroup.value.bank_lastname;
      this.accountPayment.email = this.firstFormGroup.value.bank_email;
      this.accountPayment.address_city = this.firstFormGroup.value.bank_city;
      this.accountPayment.address_country = this.firstFormGroup.value.bank_country;
      this.accountPayment.address_postal_code = this.firstFormGroup.value.bank_postal_code;
      this.accountPayment.address_line1 = this.firstFormGroup.value.bank_address;
      this.accountPayment.birthdate = birthdate;
      this.accountPayment.gender = this.firstFormGroup.value.bank_gender;
      this.accountPayment.phone = phone;

      this.paymentService.uploadId(this.idRecto['data']).subscribe(httpReturnRecto => {
        if (httpReturnRecto && httpReturnRecto.body) {
          this.accountPayment.id_recto = httpReturnRecto.body.id;
          this.paymentService.uploadId(this.idVerso['data']).subscribe(httpReturnVerso => {
            if (httpReturnVerso && httpReturnVerso.body) {
              this.accountPayment.id_verso = httpReturnVerso.body.id;
              this.paymentService.createAccount(this.accountPayment).subscribe(httpReturnAccount => {
                if (httpReturnAccount && httpReturnAccount.body) {
                  this.paymentService.createBankAccount(this.firstFormGroup.value.bank_iban).subscribe(httpReturnBankAccount => {
                    if (httpReturnBankAccount && httpReturnBankAccount.body) {

                    }
                  });
                }
              });
            }
          });
        }
      });

    }

  }

  addIdRecto(event: any): void {
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
      reader = new FileReader();
      reader.readAsDataURL(file);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => {
        this.idRecto = {data: file, path: reader.result, is_created: false};
      };
    }
  }

  addIdVerso(event: any): void {
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
      reader = new FileReader();
      reader.readAsDataURL(file);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => {
        this.idVerso = {data: file, path: reader.result, is_created: false};
      };
    }
  }


  delete(){
    this.paymentService.deleteAccount().subscribe(httpReturnBankAccount => {
      if (httpReturnBankAccount && httpReturnBankAccount.body) {
        this.show = false;
      }
    });
  }
}
