import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'comments',
  template: `
    <ng-container *ngIf="post.comments?.length">
      <div class="media mt-2" *ngFor="let comment of post.comments">
        <img [src]="comment.author.avatar" class="border" width="48">
        <div class="media-body pl-2">
          <h6>{{comment.author.name}}</h6>
          {{comment.content}}
          <comments [post]="comment"></comments>
        </div>
      </div>
    </ng-container>
  `,
  styles: []
})
export class CommentsComponent implements OnInit {

  @Input()
  post

  constructor() { }

  ngOnInit() {
  }

}
