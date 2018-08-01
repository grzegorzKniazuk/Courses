import { flatMap, switchMap } from 'rxjs/operators'
import { CardCloseComponent } from './card-close.component'
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core'

@Component({
  selector: 'dynamic-card',
  template: `
  <div class="card" *ngIf="isOpen">
    <div class="card-body">
      <card-close></card-close>
      {{ text }}
    </div>
  </div>
  `,
  styles: []
})
export class DynamicCardComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(CardCloseComponent)
  closeRefs = new QueryList<CardCloseComponent>()

  subscription

  ngAfterViewInit(){
    this.subscription = this.closeRefs.changes.pipe(
      flatMap( changes => <CardCloseComponent[]>changes.toArray()),
      switchMap( button => button.onClose )
    )
    .subscribe(()=>{
      this.close()
    })  
  }

  ngOnDestroy(){
    this.subscription && this.subscription.unsubscribe()
  }

  @Input('open')
  isOpen = false

  @Input()
  text = ''

  @Output()
  openChange = new EventEmitter()

  close() {
    this.isOpen = false
    this.openChange.emit(this.isOpen)
  }

  open() {
    this.isOpen = true
    this.openChange.emit(this.isOpen)
  }

  constructor() { }

  ngOnInit() {
  }

}
