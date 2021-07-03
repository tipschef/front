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
import { DashComponent } from './cook/components/dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import {ChartsModule} from "ng2-charts";
import { LikeChartComponent } from './cook/components/charts/like-chart/like-chart.component';
import { CardComponent } from './cook/components/card/card.component';
import { SubChartComponent } from './cook/components/charts/sub-chart/sub-chart.component';
import { FollowChartComponent } from './cook/components/charts/follow-chart/follow-chart.component';
import { BookPurchaseComponent } from './common-tipschef/components/book-purchase/book-purchase.component';
import { PayslipComponent } from './cook/components/payslip/payslip.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    LogInComponent,
    BankAccountInformationComponent,
    PaymentInformationComponent,
    DashComponent,
    LikeChartComponent,
    CardComponent,
    SubChartComponent,
    FollowChartComponent,
    BookPurchaseComponent,
    PayslipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonTipschefModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    ChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
