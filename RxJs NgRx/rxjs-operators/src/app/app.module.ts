import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicOperatorsComponent } from './basic-operators/basic-operators.component';
import { IntermediateOperatorsComponent } from './intermediate-operators/intermediate-operators.component';
import { AdvancedOperatorsComponent } from './advanced-operators/advanced-operators.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicOperatorsComponent,
    IntermediateOperatorsComponent,
    AdvancedOperatorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
