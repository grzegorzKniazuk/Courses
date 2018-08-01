import { DynamicCardComponent } from './dynamic-card.component'
import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'popup-message',
  template: `
    <div class="alert alert-primary"  *ngIf="isOpen">
    <card-close></card-close>
    <card-close></card-close>
    <card-close></card-close>
      {{ text }}
    </div>
  `,
  styles: []
})
export class PopupMessageComponent extends DynamicCardComponent implements OnInit {

  constructor() {
    super()
  }

  close(){
    setTimeout(()=>{
      super.close()
    },1500)
  }

  ngOnInit() {
  }

}