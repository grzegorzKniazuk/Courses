import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'posts-feed',
  template: `
    <h4>Social Feed</h4>
    <div class="col-8 mx-auto">
      <posts-filter (queryChange)="filter($event)"></posts-filter>
    
      <ng-container *ngIf="getResults(); then resultsTpl else noResultsTpl"></ng-container>
    
    </div>

    <ng-template #resultsTpl let-resultsList>
      <div class="card-deck flex-column">
          <div class="card mb-4" *ngFor="let result of resultsList; let i = index">
            <ng-container *ngTemplateOutlet="(result.media? mediaPost : regularPost); context: {
              post: result,
              $implicit: result,
              index: i
            }"></ng-container>
          </div>
      </div>
    </ng-template>

    <ng-template #mediaPost let-post let-i="index">
      <div class="card-body">
        <post-header [post]="post"></post-header>
        <p class="card-text">{{i}} {{post.content}}</p>
      </div>
      <img class="w-100 mx-auto" [src]="post.media.image">
      <div class="card-footer">
        <post-actions [post]="post"></post-actions>
      </div>
    </ng-template>

    <ng-template #regularPost let-post>
      <div class="card-body">
        <post-header [post]="post"></post-header>
        <p class="card-text">{{post.content}}</p>
      </div>
      <div class="card-footer">
        <post-actions [post]="post"></post-actions>
      </div>
    </ng-template>

    <ng-template #noResultsTpl>
      <no-results></no-results>
    </ng-template>
  `,
  styles: []
})
export class PostsFeedComponent implements OnInit {

  getResults(){
    return this.results.length? this.results : null
  }

  posts = [
    {
      "id": 1,
      "content": "Some example text update.",
      "author": {
        "name": "Matt Exampler",
        "avatar": "assets/avatars/mateusz.jpg"
      }
    },
    {
      "id": 2,
      "content": "Some example text update.",    
      "media": {
        "image": "assets/images/logoedu.png"
      },
      "author": {
        "name": "Greg Tester",
        "avatar": "assets/avatars/grzegorz.jpg"
      }
    },
    {
      "id": 3,
      "content": "Some example text update.",
      "author": {
        "name": "Peter Sampler",
        "avatar": "assets/avatars/piotr.png"
      }
    }
  ]

  results = []

  filter(query){
    this.results = this.posts.filter( post => {
      return !query || (post.content.includes(query) || post.author.name.includes(query))
    })
  }

  constructor() { }

  ngOnInit() {
    this.filter('')
  }

}
