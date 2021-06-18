import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './common-tipschef/components/home/home.component';
import { SignUpComponent } from './common-tipschef/components/sign-up/sign-up.component';
import { LogInComponent } from './common-tipschef/components/log-in/log-in.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './shared/material-module/material.module';
import {CommonTipschefModule} from './common-tipschef/common-tipschef.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    LogInComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
