import { Component, EventEmitter, OnInit } from '@angular/core'

@Component({
  selector: 'tabs-nav',
  template: `
    <ul class="nav nav-tabs">
      <li class="nav-item" *ngFor="let panel of panels">
        <a class="nav-link"
          [class.active]="panel.open"
          (click)="openTab(panel)"
        > {{panel.title}} </a>
      </li>
    </ul>
  `,
  styles: []
})
export class TabsNavComponent implements OnInit {

  onOpen = new EventEmitter()

  panels

  openTab(panel){
    this.onOpen.emit(panel)
  }

  constructor() { }

  ngOnInit() {
  }

}
