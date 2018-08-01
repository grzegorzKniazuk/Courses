import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'dynamic-card',
  template: `
  <div class="card" *ngIf="isOpen">
    <div class="card-body">
      <span class="close" (click)="close()">&times;</span>
      {{ text }}
    </div>
  </div>
  `,
  styles: []
})
export class DynamicCardComponent implements OnInit {

  @Input('open')
  isOpen = false

  @Input()
  text = 'test'

  @Output()
  openChange = new EventEmitter()

  close(){
    this.isOpen = false
    this.openChange.emit(this.isOpen)
  }

  constructor() { }

  ngOnInit() {
  }

}
