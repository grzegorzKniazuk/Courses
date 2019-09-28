import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/auth/reducers';
import { login } from 'app/auth/auth.actions';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private store: Store<AuthState>,
        private router: Router) {

        this.form = fb.group({
            email: [ 'test@angular-university.io', [ Validators.required ] ],
            password: [ 'test', [ Validators.required ] ],
        });

    }

    ngOnInit() {

    }

    login() {
        const { email, password } = this.form.value;
        this.auth.login(email, password)
            .pipe(
                tap((user) => {
                    this.store.dispatch(login({ user }));
                }),
            ).subscribe(
            noop,
            () => alert('Login failed'),
        );
    }

}

