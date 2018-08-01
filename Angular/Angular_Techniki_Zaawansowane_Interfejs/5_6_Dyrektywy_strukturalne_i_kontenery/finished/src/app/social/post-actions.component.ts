import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'post-actions',
  template: `
    <a href="" class="card-link">Like</a>
    <a href="" class="card-link">Comment</a>
    <a href="" class="card-link">Share</a>
  `,
  styles: []
})
export class PostActionsComponent implements OnInit {

  @Input()
  post

  constructor() { }

  ngOnInit() {
  }

}
