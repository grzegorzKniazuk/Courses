import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'post-header',
  template: `
    <div class="media">
      <img class="mr-3" class="avatar-img img-thumbnail" [src]="post.author.avatar">
      <div class="media-body ml-3 mt-2">
        <p class="author-name">{{post.author.name}}</p>
      </div>
    </div>
  `,
  styles: [`
    .author-name{
      font-weight:bold;
    }
  `]
})
export class PostHeaderComponent implements OnInit {

  @Input()
  post

  constructor() { }

  ngOnInit() {
  }

}
