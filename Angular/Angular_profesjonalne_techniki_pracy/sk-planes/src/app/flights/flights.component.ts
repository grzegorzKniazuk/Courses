import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FlightsService } from '../core/services/flights.service';
import { Observable } from 'rxjs';
import { Flight } from '../core/interfaces/flight';
import { MatDialog } from '@angular/material';
import { NewFlightComponent } from './new-flight/new-flight.component';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightsComponent implements OnInit {

  public flights$: Observable<Flight[]>;
  constructor(private flightsService: FlightsService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.flights$ = this.flightsService.flights;
  }

  public openNewFlightModal(): void {
    this.matDialog.open(NewFlightComponent);
  }
}
