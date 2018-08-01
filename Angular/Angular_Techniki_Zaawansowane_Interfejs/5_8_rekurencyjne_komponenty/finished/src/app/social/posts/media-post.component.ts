import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'media-post',
  template: `
  <div class="card-body">
    <post-header [post]="post"></post-header>
    <p class="card-text">{{post.content}}</p>
  </div>
  <img class="w-100 mx-auto" [src]="post.media.image">
  <div class="card-footer">
    <post-actions [post]="post"></post-actions>
  </div>
  `,
  styles: []
})
export class MediaPostComponent implements OnInit {

  @Input()
  post

  constructor() { }

  ngOnInit() {
  }

}
