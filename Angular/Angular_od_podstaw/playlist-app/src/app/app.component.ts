import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title = 'app';
  constructor(private http: HttpClient, private auth: AuthService) {
    this.http.get('https://api.spotify.com/v1/search?type=album&query=metalica', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + auth.getToken(),
      })
    }).subscribe((response) => {

    });
  }
}
