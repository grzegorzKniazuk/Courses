import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerBrowserComponent } from "./customer-browser/customer-browser.component";
import { CustomerDetailsComponent } from "./customer-details/customer-details.component";
import { CustomerAddComponent } from "./customer-add/customer-add.component";
import { FormsModule } from "@angular/forms";
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { RouterModule, Routes } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import {CustomerAddDeactivateGuardService} from "../../../core/services/customer-add-deactivate-guard.service";

const routes: Routes = [
  { path: 'customers', component: CustomerBrowserComponent },
  { path: 'customers/add', component: CustomerAddComponent, canActivate: [ AuthService ], canDeactivate: [CustomerAddDeactivateGuardService] },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    CustomerBrowserComponent,
    CustomerDetailsComponent,
    CustomerAddComponent,
    CapitalizePipe,
  ],
  exports: [
    CustomerBrowserComponent,
    CustomerAddComponent,
    CapitalizePipe,
  ]
})
export class CustomerModule { }
