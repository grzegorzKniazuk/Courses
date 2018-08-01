import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'static-card',
  template: `
  <div class="card">
    <div class="card-body">
      This is some text within a card body.
    </div>
  </div>
  `,
  styles: []
})
export class StaticCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
