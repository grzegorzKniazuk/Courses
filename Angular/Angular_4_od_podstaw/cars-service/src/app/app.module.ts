import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import {CarsModule} from "./cars/cars.module";
import {CoreModule} from "./core-module/core-module";
import {AppRoutingModule} from "./app-routing.module";
import {CarsRoutingModule} from "./cars/cars-routing.module";
import { SurnameShortcutPipe } from './shared-module/pipes/surname-shortcut.pipe';
import { ImportantDirective } from './shared-module/directives/important.directive';

@NgModule({
  declarations: [
    AppComponent,
    SurnameShortcutPipe,
    ImportantDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CarsModule,
    CoreModule,
    AppRoutingModule,
    CarsRoutingModule
  ],
  providers: [], // tutaj podajemy serwisy ktore tworzymy
  bootstrap: [AppComponent]
})
export class AppModule { }
