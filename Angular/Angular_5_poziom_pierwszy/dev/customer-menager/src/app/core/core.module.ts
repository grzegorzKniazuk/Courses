import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerService} from "./services/customer.service";
import {Config, CONFIG} from "./models/config";
import {MessageService} from "./services/message.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ErrorHandlingInterceptor} from "./interceptors/error-handling.interceptor";
import { NavbarComponent } from './components/navbar/navbar.component';
import {RouterModule} from "@angular/router";
import { NotFoundComponent } from './components/not-found/not-found.component';
import {AuthService} from "./services/auth.service";
import {LoginService} from "./services/login.service";
import {CustomerAddDeactivateGuardService} from "./services/customer-add-deactivate-guard.service";

const config: Config = {
  customerLimit: 10,
  apiUrl: 'http://localhost:13378',
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [
    {provide: CustomerService, useClass: CustomerService},
    {provide: CONFIG, useValue: config},
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true},
    AuthService,
    LoginService,
    CustomerAddDeactivateGuardService,
  ],
  declarations: [
    NavbarComponent,
    NotFoundComponent
  ],
  exports: [
    NavbarComponent,
  ]
})
export class CoreModule { }
