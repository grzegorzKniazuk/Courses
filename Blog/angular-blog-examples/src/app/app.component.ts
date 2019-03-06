import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public today = new Date();

  public title = 'Podstawowe pipe\'s w Angularze';
}
