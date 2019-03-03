// npm run server
// npm install @ngrx/store @ngrx/effects @ngrx/router-store  @ngrx/entity @ngrx/store-devtools

// ng generate store AppState --root --module app.module.ts
// ng generate action auth/Auth
// ng generate reducer Auth --flat=false --module auth/auth.module.ts
// ng generate effect auth/Auth --module auth/auth.module.ts

// npm install --save-dev @ngrx/schematics --save-dev
// ng config cli.defaultCollection @ngrx/schematics -- rozszerza angular cli o store'a
// npm install --save-dev @ngrx/store-devtools
// npm install --save-dev ngrx-store-freeze

/*
type AuthState = {
  loggedIn: boolean,
  userProfile: User,
}

export interface AppState { // defines data content on the store
  auth: AuthState,
}

const initialAuthState: AuthState = { // initial state
  loggedIn: false,
  userProfile: undefined
};

function authReducer(authState: AuthState = initialAuthState, action: any): AuthState {
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
 */
