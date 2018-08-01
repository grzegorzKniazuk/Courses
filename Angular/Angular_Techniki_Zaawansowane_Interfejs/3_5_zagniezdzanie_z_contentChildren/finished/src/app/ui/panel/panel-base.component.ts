import { Component, ContentChild, Input, OnInit } from '@angular/core'
import { PanelCloseComponent } from './panel-close.component';

@Component({
  selector: 'panel-base',
  template: `
    <p>
      panel-base works!
    </p>
  `,
  styles: []
})
export class PanelBaseComponent implements OnInit {

  @Input()
  title

  @ContentChild(PanelCloseComponent)
  closeBtn:PanelCloseComponent

  ngAfterContentInit() {
    this.subscribeCloseBtns()
  }

  subscribeCloseBtns(){
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
