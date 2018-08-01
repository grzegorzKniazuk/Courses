import {Inject, Injectable} from '@angular/core';
import {Customer} from "../models/customer";
import {CONFIG, Config} from "../models/config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(@Inject(CONFIG) private config: Config,
              private httpClient: HttpClient) { }

  public getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.config.apiUrl}/customers`).pipe(map((customers) => {
      return customers.slice(0, this.config.customerLimit);
    }));
  }
  public addCustomer(customer: Customer): Observable<Object> {
    return this.httpClient.post(`${this.config.apiUrl}/customers`, customer);
  }
  public deleteCustomer(customer: Customer): Observable<Object> {
    return this.httpClient.delete(`${this.config.apiUrl}/customers/${customer.id}`);
  }
}
