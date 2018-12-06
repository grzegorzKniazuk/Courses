import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {

  public userEmail: string;

  constructor(private authService: AuthService, private router: Router, private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.userEmail = this.authService.user.email;
  }

  public logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['login']);
    }).catch((error) => {
      this.matSnackBar.open(error, '', { panelClass: 'toast-error' });
    });
  }
}
