import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-flight',
  templateUrl: './new-flight.component.html',
  styleUrls: ['./new-flight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewFlightComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
