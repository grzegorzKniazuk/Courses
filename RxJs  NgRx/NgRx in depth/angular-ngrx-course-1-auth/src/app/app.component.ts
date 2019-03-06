import {Component, OnInit} from '@angular/core';
import { select, Store } from '@ngrx/store';
import {Observable} from "rxjs";
import { AppState } from 'app/reducers';
import { Logout } from 'app/auth/auth.actions';
import { isLoggedIn, isLoggedOut } from 'app/auth/auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isLoggedIn$: Observable<boolean>;
  public isLoggedOut$: Observable<boolean>;

    constructor(private store: Store<AppState>, private router: Router) {

    }

    ngOnInit() {
      this.isLoggedIn$ = this.store.pipe(select(isLoggedIn)); // uzycie selectorow z ngrx, eliminuje problem duplikowania sie w wartosci w strumieniu
      this.isLoggedOut$ = this.store.pipe(select(isLoggedOut)); // store nie odswieza sie tylko przy tej fladze, tak wiec przy subscribe zawsze lecialy by tu dane
    }

    logout() {
      this.store.dispatch(new Logout());
    }
}
