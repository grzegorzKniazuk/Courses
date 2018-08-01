import { Component, OnInit } from '@angular/core';
import { PanelBaseComponent } from './panel-base.component';

@Component({
  selector: 'panel-tab',
  template: `
  <div class="card" *ngIf="open">
      <div class="card-body">
        <ng-content></ng-content>
      </div>
  </div>
  `,
  styles: []
})
export class PanelTabComponent extends PanelBaseComponent implements OnInit {

}
