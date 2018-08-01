import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isLogged: boolean;
  constructor() { }

  public login() {
    this.isLogged = true;
  }

  public logout() {
    this.isLogged = false;
  }
}
