import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Flight } from '../../core/interfaces/flight';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightCardComponent {
  @Input() flight: Flight;
}
