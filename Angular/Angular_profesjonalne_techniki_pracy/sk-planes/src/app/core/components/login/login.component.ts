import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private matSnackBar: MatSnackBar,
    private authService: AuthService,
  ) {}

  login() {
    this.authService.login(this.credentials)
    .then(user => this.router.navigate(['/dashboard']))
    .catch(error => this.matSnackBar.open(error.message));
  }

  register() {
    this.authService.register(this.credentials)
    .then(user => this.matSnackBar.open('Account created, please log in!', '', { panelClass: 'toast-success' }))
    .catch(error => this.matSnackBar.open(error.message, '', { panelClass: 'toast-error' }));
  }
}
