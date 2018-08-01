import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core'
import { PostTplDirective } from './post-tpl.directive';

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
            <!-- <ng-container *ngTemplateOutlet="getPostTemplate(result); context: getPostContext(result)"></ng-container> -->
            <ng-container *postOutlet="result; types templates"></ng-container>
          </div>
      </div>
    </ng-template>

    <div *postTpl="let post; type 'media' ">
      <div class="card-body">
        <post-header [post]="post"></post-header>
        <p class="card-text">{{post.content}}</p>
      </div>
      <img class="w-100 mx-auto" [src]="post.media.image">
      <div class="card-footer">
        <post-actions [post]="post"></post-actions>
      </div>
    </div>

    <div *postTpl="let post; type 'regular' ">
      <div class="card-body">
        <post-header [post]="post"></post-header>
        <p class="card-text">{{post.content}}</p>
      </div>
      <div class="card-footer">
        <post-actions [post]="post"></post-actions>
      </div>
    </div>

    <ng-template #noResultsTpl>
      <no-results></no-results>
    </ng-template>
  `,
  styles: []
})
export class PostsFeedComponent implements OnInit {

  @ViewChildren(PostTplDirective,{ read: PostTplDirective })
  postTpls = new QueryList<PostTplDirective>()

  templates:PostTplDirective[]

  ngAfterViewInit(){
    setTimeout(()=>{
      this.templates = this.postTpls.toArray()
    })
  }

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
