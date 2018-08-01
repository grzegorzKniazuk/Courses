import { Component, OnInit } from '@angular/core';
import {CustomerType} from "../../../../core/enums/customerType";
import {CustomerService} from "../../../../core/services/customer.service";
import {MessageService} from "../../../../core/services/message.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  public CustomerType = CustomerType;
  public name: string;
  public age: number;
  public type: CustomerType;
  constructor(private customerService: CustomerService, private messageService: MessageService) {}

  ngOnInit() {
  }

  public addCustomer(form: NgForm): void {
    this.customerService.addCustomer({
      name: this.name,
      age: this.age,
      type: this.type,
      photoUrl: '',
      categories: [],
      description: '',
      address: {
        city: '',
        houseNumber: 0,
        street: '',
      }
    }).subscribe(
      () => form.resetForm(),
      () => this.messageService.error('Błąd zapytania do serwera.'),
      ); // subscribe wymagany aby wyslac zapytanie post
    this.messageService.success('Dodano nowego klienta!');
  }
}
