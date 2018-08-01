import { RouterModule, Routes } from '@angular/router';
import { PlaylistsComponent } from './playlists.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { PlaylistFormComponent } from './playlist-form/playlist-form.component';

const routesConfig: Routes = [
  { path: 'playlists', component: PlaylistsComponent ,
    children: [ // zagniezdzony routing
      { path: '', component: PlaylistDetailComponent },
      { path: ':id', component: PlaylistDetailComponent },
      { path: ':id/edit', component: PlaylistFormComponent },
      { path: 'new', component: PlaylistFormComponent }
      ]
  }];

// konfiguracja routera
export const routerModule = RouterModule.forChild(routesConfig);

