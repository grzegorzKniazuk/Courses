import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

import {
    MatListModule,
    MatSidenavModule, MatToolbarModule,
} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";

import {RouterModule, Routes} from "@angular/router";
import {AuthModule} from "./auth/auth.module";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'environments/environment';
import {RouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store";

import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './reducers';
import { AuthGuard } from 'app/auth/auth.guard';
import { CustomSerializer } from 'app/shared/utils';


const routes: Routes = [
    {
        path: 'courses',
        loadChildren: './courses/courses.module#CoursesModule',
        canActivate: [ AuthGuard ],
    },
    {
        path: "**",
        redirectTo: '/'
    }
];


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([]),
        AuthModule.forRoot(),
        StoreRouterConnectingModule.forRoot({
          stateKey: 'router'
        }),
        !environment.production ? StoreDevtoolsModule.instrument() : [], // store devTools only in dev mode
    ],
    providers: [
      { provide: RouterStateSerializer, useClass: CustomSerializer }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
