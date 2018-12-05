import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Flight } from '../../core/interfaces/flight';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightDetailsComponent implements OnInit {

  public flight: Flight;

  // przekazywanie danych do dynamicznego komponentu
  constructor(private dialogRef: MatDialogRef<FlightDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Flight,
              private router: Router) {}

  ngOnInit() {
    this.flight = this.data;
  }

  public close(): void {
    this.dialogRef.close();
  }

  public goToEditFlight(): void {
    this.close();
    this.router.navigate(['dashboard', 'flights', this.flight.key ]);
  }
}
