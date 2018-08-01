import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'panel',
  template: `
    <div class="card">
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: []
})
export class PanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
