import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistsModule } from './playlists/playlists.module';
import { AuthService } from './auth.service';
import { MusicSearchModule } from './music-search/music-search.module';
import {routerModule} from './app.routing';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [ // deklaracje komponentow
    AppComponent, NavbarComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PlaylistsModule,
    MusicSearchModule,
    routerModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private auth: AuthService) {
    auth.getToken();
  }
}
