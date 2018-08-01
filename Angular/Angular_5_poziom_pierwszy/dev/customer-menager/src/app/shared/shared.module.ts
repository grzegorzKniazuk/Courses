import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from "./directives/highlight.directive";
import { CustomerModule } from "./components/customer/customer.module";
import { ContractsModule } from "./components/contracts/contracts.module";

@NgModule({
  imports: [
    CommonModule,
    CustomerModule,
    ContractsModule,
  ],
  declarations: [
    HighlightDirective,
  ],
  exports: [
    HighlightDirective,
    CustomerModule,
    ContractsModule,
  ]
})
export class SharedModule { }
