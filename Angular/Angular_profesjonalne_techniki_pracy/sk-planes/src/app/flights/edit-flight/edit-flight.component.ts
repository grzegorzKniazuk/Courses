import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FlightFormComponent } from '../flight-form/flight-form.component';
import { FlightsService } from '../../core/services/flights.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Flight } from '../../core/interfaces/flight';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFlightComponent implements AfterViewInit {

  public flight: Flight;
  @ViewChild(FlightFormComponent) public flightFormComponent: FlightFormComponent;
  constructor(private flightsService: FlightsService, private activatedRoute: ActivatedRoute, private matSnackBar: MatSnackBar, private router: Router) { }

  ngAfterViewInit() {
    this.fetchFlightData();
  }

  public fetchFlightData(): void {
    this.flightsService.flight(this.activatedRoute.snapshot.params['key']).pipe(tap((data: Flight) => {
      this.flightFormComponent.setFlight(data);
    })).subscribe((data: Flight) => {
      this.flight = data;
    });
  }

  public editFlight(): void {
    this.flightsService.editFlight(this.flight.id, this.flightFormComponent.flightForm.value)
    .then(this.onEditSuccess.bind(this))
    .catch(this.onEditFailure.bind(this));
  }

  private onEditSuccess(): void {
    this.router.navigate([ 'dashboard' ]);
    this.matSnackBar.open('Flight has been successfully edited.', '', { panelClass: 'toast-success' });
  }

  private onRemoveSuccess(): void {
    this.router.navigate([ 'dashboard' ]);
    this.matSnackBar.open('Flight has been successfully deleted.', '', { panelClass: 'toast-success' });
  }

  private onEditFailure(error): void {
    this.matSnackBar.open(error, '', { panelClass: 'toast-error' });
  }

  public removeFlight() {
    this.flightsService.deleteFlight(this.flight.id)
    .then(this.onRemoveSuccess.bind(this))
    .catch(this.onEditFailure.bind(this));
  }
}
