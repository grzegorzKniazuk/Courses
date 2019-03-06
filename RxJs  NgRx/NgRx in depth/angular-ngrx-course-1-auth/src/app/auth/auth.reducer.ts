import { User } from 'app/model/user.model';
import { AuthActions, AuthActionTypes } from 'app/auth/auth.actions';

export interface AuthState {
  loggedIn: boolean,
  userProfile: User,
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  userProfile: undefined
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState { // musi spelniac pure function
  switch (action.type) {
    case AuthActionTypes.LoginAction: { // modyfikacja state przy logowaniu
      return {
        loggedIn: true,
        userProfile: action.payload.user
      };
    }
    case AuthActionTypes.LogoutAction: { // modyfikacja state przy wylogowaniu
      return {
        loggedIn: false,
        userProfile: undefined,
      };
    }
    default:
      return state;
  }
}
