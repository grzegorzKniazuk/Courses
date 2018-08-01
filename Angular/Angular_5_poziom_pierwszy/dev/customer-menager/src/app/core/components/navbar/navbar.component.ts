import { Component } from '@angular/core';
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public loginService: LoginService) { }

  public login(): void {
    this.loginService.login();
  }
  public logout(): void {
    this.loginService.logout();
  }
}
