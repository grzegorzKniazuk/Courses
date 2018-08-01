import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Customer} from "../../../../core/models/customer";
import {CustomerType} from "../../../../core/enums/customerType";
import {MessageService} from "../../../../core/services/message.service";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit, OnChanges {

  public showPhoto: boolean = false;
  @ViewChild('details') public detailsComponent: CustomerDetailsComponent;
  @Input() public customer: Customer = null;
  @Output() public onShift: EventEmitter<string> = new EventEmitter<string>();
  public customerType = CustomerType;
  constructor() { }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {}

  public left(): void {
    this.onShift.emit('left');
  }

  public right(): void {
    this.onShift.emit('right');
  }

}
