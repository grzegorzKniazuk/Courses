import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  menu = {
    items:[
      { label: 'Pierwsza opcja' },
      { label: 'Druga opcja' },
      { label: 'Jeszcze jedna...' },
    ]
  }

  addMenuItem(label){
    this.menu.items.push({
      label
    })
  }
}
