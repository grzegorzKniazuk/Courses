import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicSearchComponent } from './music-search/music-search.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumCardComponent } from './album-card/album-card.component';
import { MusicSearchService } from './music-search.service';
import { AlbumSearchFormComponent } from './album-search-form/album-search-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routerModule } from './music-search.routing';
import { HttpClientModule } from '@angular/common/http';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { TracklistComponent } from './tracklist/tracklist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routerModule,
    HttpClientModule,
  ],
  declarations: [
    MusicSearchComponent,
    AlbumListComponent,
    AlbumCardComponent,
    AlbumSearchFormComponent,
    AlbumDetailsComponent,
    TracklistComponent,
  ],
  exports: [
    MusicSearchComponent,
  ],
  providers: [
    MusicSearchService,
  ]
})
export class MusicSearchModule { }
