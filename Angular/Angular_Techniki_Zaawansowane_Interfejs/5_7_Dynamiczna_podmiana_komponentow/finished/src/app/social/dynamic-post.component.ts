import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core'
import { RegularPostComponent } from './posts/regular-post.component';
import { MediaPostComponent } from './posts/media-post.component';

@Component({
  selector: 'dynamic-post',
  template: `  
    <div>
      <ng-container #containerRef></ng-container>
    </div>
  `,
  styles: []
})
export class DynamicPostComponent implements OnInit {

  @Input()
  post

  @ViewChild('containerRef', {read:ViewContainerRef})
  containerRef:ViewContainerRef

  constructor(private resolver:ComponentFactoryResolver,
            private viewContainer: ViewContainerRef) { }

  types = {
    'regular': RegularPostComponent,
    'media': MediaPostComponent,
  }

  ngOnInit( ) {
    let Type = this.types[ this.post.type ]
    let factory = this.resolver.resolveComponentFactory(Type)
    let component = factory.create(this.viewContainer.injector)
    component.instance['post'] = this.post 
    // this.viewContainer.insert(component.hostView)
    this.containerRef.insert(component.hostView)
  }

}
