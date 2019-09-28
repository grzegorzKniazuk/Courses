import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'environments/environment';
import { routerReducer } from '@ngrx/router-store';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
};

// metaReducer
export function loggerReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        console.log(`state before: ${state}`);
        console.log(`invoked action: ${action.type}`);

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [ loggerReducer ] : [];
