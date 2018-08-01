import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable, Subject } from 'rxjs';
import { from } from 'rxjs/internal/observable/from';
import {startWith, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MusicSearchService {

  public albums = [];
  public albumsStream = new Subject();

  constructor(private httpClient: HttpClient, private auth: AuthService) {
    this.search('superman');
  }

  public getAlbumsStream(): Observable<any> {
    return from(this.albumsStream).pipe(startWith(this.albums));
  }

  public search(query: string): void {
    const url = `https://api.spotify.com/v1/search?type=album&market=PL&query=${query}`;

    this.httpClient.get(url, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.auth.getToken(),
      })
    }).pipe(map((response: Response) => {
      const data = JSON.parse(JSON.stringify(response));
      return data.albums.items;
    })).pipe(tap(albums => {
      this.albums = albums;
    })).subscribe(() => {
      this.albumsStream.next(this.albums);
    });
  }

  public getAlbum(id: string): Observable<any> {
    const url = `https://api.spotify.com/v1/albums/${id}`;

    return this.httpClient.get(url, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.auth.getToken(),
      })
    }).pipe(map((response: Response) => {
      return JSON.parse(JSON.stringify(response));
    }));
  }
}

