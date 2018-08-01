import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'panel',
  template: `
    <div class="card">
      <div class="card-header">
        <h5 *ngIf="title">{{title}}</h5>
        <ng-content select="panel-header"></ng-content>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer">
        <ng-content select="panel-footer"></ng-content>
      </div>
    </div>
  `,
  styles: []
})
export class PanelComponent implements OnInit {

  @Input()
  title

  constructor() { }

  ngOnInit() {
  }

}
