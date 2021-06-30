import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './common-tipschef/components/home/home.component';
import { SignUpComponent } from './common-tipschef/components/sign-up/sign-up.component';
import { LogInComponent } from './common-tipschef/components/log-in/log-in.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './shared/material-module/material.module';
import {CommonTipschefModule} from './common-tipschef/common-tipschef.module';
import {TokenInterceptor} from './common-tipschef/interceptor/token.interceptor';
import { BankAccountInformationComponent } from './cook/components/bank-account-information/bank-account-information.component';
import { PaymentInformationComponent } from './cook/components/payment-information/payment-information.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    LogInComponent,
    BankAccountInformationComponent,
    PaymentInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonTipschefModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
