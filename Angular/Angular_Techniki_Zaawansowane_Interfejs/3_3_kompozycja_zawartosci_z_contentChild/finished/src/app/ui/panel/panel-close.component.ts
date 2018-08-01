import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'panel-close',
  template: `
  <span class="close" (click)="close()">&times;</span>
  `,
  styles: []
})
export class PanelCloseComponent implements OnInit {

  constructor() { }

  @Output('close')
  onClose = new EventEmitter()

  close(){
    this.onClose.emit()
  }

  ngOnInit() {
  }

}
