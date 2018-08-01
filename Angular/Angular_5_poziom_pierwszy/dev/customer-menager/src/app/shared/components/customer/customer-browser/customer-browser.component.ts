import {AfterContentInit, Component, OnInit} from '@angular/core';
import {Customer} from "../../../../core/models/customer";
import {CustomerService} from "../../../../core/services/customer.service";
import {MessageService} from "../../../../core/services/message.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-customer-browser',
  templateUrl: './customer-browser.component.html',
  styleUrls: ['./customer-browser.component.css']
})
export class CustomerBrowserComponent implements OnInit, AfterContentInit {

  public customers: Customer[];
  public customer: Customer = null;
  constructor(private customerService: CustomerService, private messageService: MessageService) { }

  public ngOnInit(): void {
    this.refresh();
  }

  public ngAfterContentInit(): void {
    this.messageService.success('Załadowano dane klientów.');
  }

  public shiftCustomer(direction: string): void {
    const index = this.customers.indexOf(this.customer);
    if (direction === 'left' && index !== 0) {
      this.customer = this.customers[index-1];
    } else if (direction === 'right' && index !== this.customers.length-1) {
      this.customer = this.customers[index+1];
    }
  }
  public deleteCustomer(): void {
    this.customerService.deleteCustomer(this.customer).subscribe(
      () =>  this.refresh(),
      () => this.messageService.error('Błąd zapytania do serwera.'),
      );
    this.messageService.error('Usunięto klienta.');
  }
  public refresh(): void {
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers;
    })
  }
}
