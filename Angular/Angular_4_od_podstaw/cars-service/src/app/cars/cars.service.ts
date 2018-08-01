import { Injectable } from "@angular/core";
import { Car } from "./models/car";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient } from "@angular/common/http";
import 'rxjs';
import {map} from "rxjs/operators";

@Injectable()
export class CarsService {
  private apiUrl : 'http://localhost:3000/api/cars';

  constructor(private http : HttpClient) {

  }

  getCars() Observable<Car>{
    return this.http.get(this.apiUrl).pipe(map(res = > res.json));
  }

  getCar(id : number) {

  }

  addCar(data) : Observable<Car> {
    return this.http.get(this.apiUrl, data).pipe(map(res = > res.json));
  }

  deleteCar(id : number) : Observable<Car> {
    return this.http.delete(this.apiUrl).pipe(map(res = > res.json));
  }
}
