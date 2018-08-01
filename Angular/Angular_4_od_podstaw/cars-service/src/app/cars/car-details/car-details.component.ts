import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CarsService} from "../cars.service";
import {Car} from "../models/car";

@Component({
  selector: 'cs-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.less']
})
export class CarDetailsComponent implements OnInit {

  car : Car;

  constructor(private carsService : CarsService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.loadCar();
  }

  loadCar() {

    // localhost:4200/cars/3 - 3 to jest wlasnie params
    // snapschot - czyta urla

    this.car = this.route.snapshot.data['car'];
  }
}
