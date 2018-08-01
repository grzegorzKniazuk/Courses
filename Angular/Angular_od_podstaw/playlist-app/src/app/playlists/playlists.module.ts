import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './playlists.component';
import { ContentCardComponent } from './content-card/content-card.component';
import { PlaylistFormComponent } from './playlist-form/playlist-form.component';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { FormsModule } from '@angular/forms';
import { PlaylistsService } from './playlists.service';
import { routerModule } from './playlists.routing';

class SpecialPlaylistService extends PlaylistsService {}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routerModule,
  ],
  declarations: [
    PlaylistsComponent,
    ContentCardComponent,
    PlaylistFormComponent,
    PlaylistListComponent,
    PlaylistDetailComponent,
  ],
  exports: [
    PlaylistsComponent,
  ],
  providers: [
    PlaylistsService,
    {provide: PlaylistsService, useClass: SpecialPlaylistService},
  ]
})
export class PlaylistsModule { }
