import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, Login, Logout } from 'app/auth/auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defer, InteropObservable, Observable, of } from 'rxjs';

// saving the user credentials in local storage is an example of a side effect that we want our application to produce in response to the action
// this is called a side effect because the action is not only affecting the state of the store via the reducer but the action is also producing
// some modification of state outside of the store
// side effect mamy gdy oprocz zmiany store'a wykonujemy jakies akcje "po drodze", np zapis do bazy danych - jest to side effect
@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false }) // observable is a side effect // dispatch: false poniewaz efekt nie wywoluje innej akcji za pomoca dispatch
  public login$: Observable<Login> = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction), // czy jest to ta konkretna akcja
    tap(action => {
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      this.router.navigateByUrl('/courses').catch((error) => console.log(error));
    })
  );

  @Effect({ dispatch: false }) // observable is a side effect // dispatch: false poniewaz efekt nie wywoluje innej akcji za pomoca dispatch
  public logout$: Observable<Logout> = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction), // czy jest to ta konkretna akcja
    tap(() => {
      localStorage.removeItem('user'); // side effect
      this.router.navigateByUrl('/login').catch((error) => console.log(error)); // side effect
    })
  );

  // initialization side effect - or refresh page
  // defer - wait for someone to subscribe to these observable before creating an observable using this function there
  // @ts-ignore
  @Effect()
  public init$ = defer(() => {
    // create here an observable only when rxjs effects is ready to receive new actions

    const userData = localStorage.getItem('user');

    if (userData) {
      return of(new Login(JSON.parse(userData))); // wywolanie akcji i zwrotka jako observable
    } else {
      return of(new Logout());
    }

  });

  constructor(private actions$: Actions, private router: Router) {}
}
