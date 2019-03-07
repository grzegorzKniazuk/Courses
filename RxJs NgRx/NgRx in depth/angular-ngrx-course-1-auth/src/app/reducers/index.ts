import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { environment } from 'environments/environment';
import { AuthState } from 'app/auth/auth.reducer';
import { storeFreeze } from 'ngrx-store-freeze';
import { routerReducer } from '@ngrx/router-store';


export interface AppState { // defines data content on the store

}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer, // for ngrs- router devTools
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : []; // storeFreeze makes state object immutable
