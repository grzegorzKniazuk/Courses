import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostsFeedComponent } from './social/posts-feed.component';
import { PostActionsComponent } from './social/post-actions.component';
import { PostHeaderComponent } from './social/post-header.component';
import { NoResultsComponent } from './social/no-results.component';
import { PostsFilterComponent } from './social/posts-filter.component';
import { RegularPostComponent } from './social/posts/regular-post.component';
import { MediaPostComponent } from './social/posts/media-post.component';
import { DynamicPostComponent } from './social/dynamic-post.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsFeedComponent,
    PostActionsComponent,
    PostHeaderComponent,
    NoResultsComponent,
    PostsFilterComponent,
    RegularPostComponent,
    MediaPostComponent,
    DynamicPostComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents:[
    RegularPostComponent,
    MediaPostComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
