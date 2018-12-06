import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Flight } from '../interfaces/flight';
import ThenableReference = firebase.database.ThenableReference;

@Injectable({
  providedIn: 'root',
})
export class FlightsService {

  private readonly API_URL = '/flights';

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  public get flights(): Observable<Flight[]> { // oparte na websockets
    return this.angularFireDatabase.list<Flight>(this.API_URL).snapshotChanges().pipe(map(flights => {
        return flights.map(flight => {
          const data = <Flight>flight.payload.val();
          const id = flight.payload.key;
          return { id, ...data };
        });
    }));
  }

  public flight(key: string): Observable<Flight> {
    return this.angularFireDatabase.object<Flight>(`${this.API_URL}/${key}`).snapshotChanges().pipe(map(flight => {
      const data = <Flight>flight.payload.val();
      const id = flight.payload.key;
      return { id, ...data }
    }));
  }

  public addFlight(flight: Flight): ThenableReference {
    return this.angularFireDatabase.list<Flight>(this.API_URL).push(flight);
  }

  public editFlight(key: string, flight: Flight): Promise<void> {
    return this.angularFireDatabase.object<Flight>(`${this.API_URL}/${key}`).update(flight);
  }

  public deleteFlight(key: string): Promise<void> {
    return this.angularFireDatabase.object<Flight>(`${this.API_URL}/${key}`).remove();
  }
}
