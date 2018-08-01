import { RouterModule, Routes } from '@angular/router';
import { MusicSearchComponent } from './music-search/music-search.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';

const routesConfig: Routes = [
  { path: 'music', component: MusicSearchComponent},
  { path: 'music/album/:id', component: AlbumDetailsComponent}, // : to zapytanie z parametrem
];

// konfiguracja routera
export const routerModule = RouterModule.forChild(routesConfig);

