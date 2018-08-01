// route dla zagniezdzonych komponentow

import {RouterModule} from "@angular/router";
import {Route} from "@angular/router";
import { NgModule } from '@angular/core';
import { CarDetailsComponent} from "./car-details/car-details.component";
import {CarResolve} from "./car-resolve.service";

const CARS_ROUTES : Route[] = [
  {
    path : 'cars/:', // : - oznacza dowolna liczbe
    component : CarDetailsComponent,
    resolve : {
      car : CarResolve
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(CARS_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class CarsRoutingModule {

}
