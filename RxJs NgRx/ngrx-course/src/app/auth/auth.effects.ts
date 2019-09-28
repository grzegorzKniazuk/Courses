import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from 'app/auth/action-types';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

    private readonly login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.login),
            tap((action) => {
                this.router.navigateByUrl('/courses').then(() => {
                    localStorage.setItem('user', JSON.stringify(action.user));
                });
            }),
        );
    }, { dispatch: false });

    private readonly logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(() => {
                localStorage.removeItem('user');
                this.router.navigateByUrl('/login');
            }),
        );
    }, { dispatch: false });

    constructor(
        private actions$: Actions,
        private router: Router,
    ) {
    }

}
