import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private spotifyHref = 'https://accounts.spotify.com/authorize';
  private clientId = '7bcfc8881405485ba63cb16db9d07760';
  private responseType = 'token';
  private redirectUrl = 'http://localhost:4200/';

  constructor() { }
  public getToken(): string {

    // this.authorize();
    console.log(localStorage.getItem('token'));
    if (!localStorage.getItem('token')) {
      const match = window.location.hash.match(/#access_token=(.*?)&/);
      const token = match && match[1];
      localStorage.setItem('token', token);
      this.authorize();
    }
    return localStorage.getItem('token');
  }
  public authorize(): void {
    // localStorage.removeItem('token');
    window
      .location
      .replace(`${this.spotifyHref}?client_id=${this.clientId}&response_type=${this.responseType}&redirect_uri=${this.redirectUrl}`);
  }
}
