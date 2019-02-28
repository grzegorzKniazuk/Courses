import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from 'environments/environment';
import { User } from 'app/model/user.model';
import { AuthActionTypes } from 'app/auth/auth.actions';

type AuthState = {
  loggedIn: boolean,
  userProfile: User,
}

export interface AppState { // defines data content on the store
  auth: AuthState,
}

function authReducer(authState: AuthState, action: any): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginAction: { // modyfikacja state przy logowaniu
      return {
        loggedIn: true,
        userProfile: action.payload.user
      };
    }
    default: {
      return authState; // jesli akcja nierozpoznana zwroc state bez modyfikacji
    }
  }
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
