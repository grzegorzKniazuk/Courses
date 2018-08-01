import { PostTplDirective } from './post-tpl.directive'
import { Directive, Input, ViewContainerRef } from '@angular/core'

@Directive({
  selector: '[postOutlet]'
})
export class PostOutletDirective {

  @Input('postOutlet') // $implicit
  post

  @Input('postOutletTypes')
  set types(types:PostTplDirective[]){
    if(!types){
      return
    }
    this.postTpls = types
    var postTpl = types.find(
      postTpl => postTpl.type == this.post.type 
    )
    
    this.container.createEmbeddedView(postTpl.template, {
      post: this.post,
      $implicit: this.post
    })
  }

  postTpls

  constructor(private container: ViewContainerRef) { 
  }

}
