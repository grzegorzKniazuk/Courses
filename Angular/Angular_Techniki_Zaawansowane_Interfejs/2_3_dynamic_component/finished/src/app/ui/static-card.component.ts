import { Attribute, Component, OnInit } from '@angular/core'

@Component({
  selector: 'static-card',
  template: `
  <div class="card" [ngClass]="{
    'bg-info text-white': type == 'message',
    'bg-danger text-white': type == 'error'
  }">
    <div class="card-body">
      {{ bodyText }}
    </div>
  </div>
  `,
  styles: []
})
export class StaticCardComponent implements OnInit {

  constructor(
    @Attribute('text') public bodyText,
    @Attribute('type') public type) { }

  ngOnInit() {
  }

}
