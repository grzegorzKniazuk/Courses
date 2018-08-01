import { PanelCloseComponent } from './panel-close.component'
import { AfterContentInit, Component, ContentChild, Input, OnInit } from '@angular/core'

@Component({
  selector: 'panel',
  template: `
    <div class="card" *ngIf="open">
      <div class="card-header">
      <ng-content select="panel-header"></ng-content>
      <h5 *ngIf="title">{{title}}</h5>
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
export class PanelComponent implements OnInit, AfterContentInit {

  @Input()
  title

  @ContentChild(PanelCloseComponent)
  closeBtn:PanelCloseComponent

  ngAfterContentInit() {
    if(this.closeBtn){
      this.closeBtn.onClose.subscribe(()=>{
        this.open = false
      })
    }
  }

  @Input()
  open = true

  constructor() { }

  ngOnInit() {
  }

}
