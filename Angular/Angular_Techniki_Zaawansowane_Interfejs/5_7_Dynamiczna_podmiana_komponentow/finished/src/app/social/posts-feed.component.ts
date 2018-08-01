import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';

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
          <div class="card mb-4" *ngFor="let result of resultsList">

            <dynamic-post [post]="result"></dynamic-post>


            <!-- <ng-container [ngSwitch]="result.type">
              <media-post *ngSwitchCase=" 'media' " [post]="result"></media-post>
              <regular-post *ngSwitchDefault [post]="result"></regular-post>
            </ng-container> -->

          </div>
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
      "type": "regular",
      "author": {
        "name": "Matt Exampler",
        "avatar": "assets/avatars/mateusz.jpg"
      }
    },
    {
      "id": 2,
      "content": "Some example text update.",    
      "type": "media",
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
      "type": "regular",
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
