import { createReducer, on } from '@ngrx/store';
import { User } from 'app/auth/model/user.model';
import { AuthActions } from 'app/auth/action-types';

export interface AuthState {
    user: User;
}

export const initialAuthState: AuthState = {
    user: undefined,
};

export const authReducer = createReducer(
    initialAuthState,
    on(AuthActions.login, ((state, { user }) => {
        return {
            ...state,
            user,
        };
    })),
    on(AuthActions.logout, ((state) => {
        return {
            ...state,
            user: undefined,
        };
    })),
);
