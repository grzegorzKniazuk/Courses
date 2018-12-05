import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FlightFormComponent } from '../flight-form/flight-form.component';
import { FlightsService } from '../../core/services/flights.service';

@Component({
  selector: 'app-new-flight',
  templateUrl: './new-flight.component.html',
  styleUrls: ['./new-flight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewFlightComponent{

  @ViewChild(FlightFormComponent) public flightFormComponent: FlightFormComponent;

  constructor(private matDialogRef: MatDialogRef<NewFlightComponent>,
              private flightsService: FlightsService,
              private matSnackBar: MatSnackBar) { }

  public createFlight(): void {
    this.flightsService.addFlight(this.flightFormComponent.flightForm.value).then(this.onCreatingSuccess.bind(this), this.onCreatingFailure.bind(this));
  }

  private onCreatingSuccess(): void {
    this.matSnackBar.open('Flight has ben been successfully created!', '', {
      panelClass: 'toast-success',
    });
    this.matDialogRef.close();
  }

  private onCreatingFailure(error): void {
    this.matSnackBar.open(error.message, '', {
      panelClass: 'toast-error',
    });
  }
}
