import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Car} from "../models/car";
import {TotalCostComponent} from "../total-cost/total-cost.component";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Validators} from "@angular/forms";

@Component({
  selector: 'cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.less']
})
export class CarsListComponent implements OnInit, AfterViewInit {

  // dekorator @ViewChild pozwala na dostęp do metod publicznych zagniezdzonego komponentu
  @ViewChild("totalCostRef") totalCostRef : TotalCostComponent;

  carForm : FormGroup;
  totalCost : number;
  grossCost : number;

  cars : Car[] = [
    {
      id : 1,
      model : 'Mazda Rx7',
      plate : 'GD2121E',
      deliveryDate : '21-04-2017',
      deadline : '05-05-2016',
      client : {
        firstName : 'Jan',
        surname : 'Kowalski'
      },
      cost : 300,
      isFullyDamaged : true
    },
    {
      id : 2,
      model : 'Mazda Rx7',
      plate : 'GD2121E',
      deliveryDate : '21-04-2017',
      deadline : '05-05-2016',
      client : {
        firstName : 'Jan',
        surname : 'Kowalski'
      },
      cost : 300,
      isFullyDamaged : true
    },
    {
      id : 3,
      model : 'Mazda Rx7',
      plate : 'GD2121E',
      deliveryDate : '21-04-2017',
      deadline : '05-05-2016',
      client : {
        firstName : 'Jan',
        surname : 'Kowalski'
      },
      cost : 300,
      isFullyDamaged : true
    }];

  constructor(private router : Router, private formBuilder : FormBuilder) {

  }

  goToCarDetails(car : Car) {
    this.router.navigate(['/cars/', car.id]);
  }


  // ngOnInit - wykonanie na starcie komponentu
  ngOnInit() { // tutaj startujemy funkcje z komponentu
    this.countTotalCost();
    this.carForm = this.buildCarForm();

  }

  buildCarForm() {
    return this.formBuilder.group({
    model : ['', Validators.required],
    plate : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]],
    deliveryDate : '',
    deadline : '',
    client : '',
    cost : '',
    isFullyDamaged : ''
    })
  }

  removeCar(car : Car, event) {
    event.stopPropagation();
    this.carsService.removeCar(car.id).subscribe(() => {
      this.loadCars()
    });
  }


  addCar() {
    this.carsService.addCar(this.carForm.value).subscribe(() => this.loadCars());
  }

  ngAfterViewInit() {
    this.totalCostRef.showGross();
  }

  showGross() : void {
    this.totalCostRef.showGross();
  }

  countTotalCost() : void {
    this.totalCost = this.cars
                         .map(car => car.cost)
                         .reduce((prev, next) => prev + next, 0);
  }

  // jesli funkcja zostanie wywolana to odebrany parametr przypisz do pola grossCost
  // grossCost jest tutaj parametrem $event z emitera
  onShownGross(grossCost : number) : void {
    this.grossCost = grossCost;
  }
}
