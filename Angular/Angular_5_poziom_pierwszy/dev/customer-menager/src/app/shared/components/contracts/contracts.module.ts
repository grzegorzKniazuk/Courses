import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractListComponent } from './contract-list/contract-list.component';
import { RouterModule, Routes } from "@angular/router";
import {ContractService} from "../../../core/services/contract.service";
import { ContractDetailsComponent } from './contract-details/contract-details.component';

const routes: Routes = [
  { path: '', component: ContractListComponent },
  { path: ':id', component:  ContractDetailsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ContractListComponent,
    ContractDetailsComponent,
  ],
  providers: [
    ContractService,
  ],
  exports: [
    ContractListComponent,
  ]
})
export class ContractsModule { }
