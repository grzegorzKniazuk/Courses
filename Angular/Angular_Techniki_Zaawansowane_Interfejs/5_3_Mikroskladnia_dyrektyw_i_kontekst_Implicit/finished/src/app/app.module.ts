import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostsFeedComponent } from './social/posts-feed.component';
import { PostActionsComponent } from './social/post-actions.component';
import { PostHeaderComponent } from './social/post-header.component';
import { NoResultsComponent } from './social/no-results.component';
import { PostsFilterComponent } from './social/posts-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsFeedComponent,
    PostActionsComponent,
    PostHeaderComponent,
    NoResultsComponent,
    PostsFilterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
