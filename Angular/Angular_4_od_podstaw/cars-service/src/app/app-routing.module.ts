// route dla glownej nawigacji

import {RouterModule} from "@angular/router";
import {CarsListComponent} from "./cars/cars-list/cars-list.component";
import {Route} from "@angular/router";
import { NgModule } from '@angular/core';

const APP_ROUTES : Route[] = [
  {
    path : '',
    pathMatch : 'full', // jak musi zgadzac sie nasza sciezka z patch?
    redirectTo : 'cars' // do jakiego widoku ma wystapic przekierowanie?
  },
  {
    path : 'cars',
    component : CarsListComponent
  }
];

@NgModule({
  imports: [
      RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
