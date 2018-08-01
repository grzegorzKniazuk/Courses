import {Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'cs-total-cost',
  templateUrl: './total-cost.component.html',
  styleUrls: ['./total-cost.component.less'],
  changeDetection : ChangeDetectionStrategy.OnPush // zmiana systemu detekcji
})

export class TotalCostComponent {

  @Input() totalCost : number; // przekazuje dane od rodzica do zagniezdzonego komponentu

  // dekorator output, przekazuje dane z zagniezdzonego komponentu do rodzica
  // wymagany EventEmmiter - taki 'nadajnik'
  @Output() shownGross : EventEmitter<number> = new EventEmitter<number>();

  private VAT = 1.23;

  showGross() : void {
    this.shownGross.emit(this.totalCost * this.VAT);
  }
}
