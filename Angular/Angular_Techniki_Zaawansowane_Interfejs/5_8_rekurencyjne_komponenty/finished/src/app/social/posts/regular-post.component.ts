import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'regular-post',
  template: `
  <div class="card-body">
    <post-header [post]="post"></post-header>
    <p class="card-text">{{post.content}}</p>
  </div>
  <div class="card-footer">
    <post-actions [post]="post"></post-actions>
    <comments [post]="post"></comments>
  </div>
  `,
  styles: []
})
export class RegularPostComponent implements OnInit {

  @Input()
  post

  constructor() { }

  ngOnInit() {
  }

}
