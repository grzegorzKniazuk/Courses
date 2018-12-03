import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from '../../../../../materialy_do_kursu/skplanes/src/app/core/dashboard/dashboard.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
  ],
  exports: [
    LoginComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class CoreModule { }
