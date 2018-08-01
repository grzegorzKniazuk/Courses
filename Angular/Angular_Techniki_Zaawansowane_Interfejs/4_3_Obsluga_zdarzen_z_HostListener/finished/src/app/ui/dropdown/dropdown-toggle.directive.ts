import { Directive, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[dropdown-toggle], .dropdown-toggle',
  // host:{
  //   '(click)':'toggle()'
  // }
})
export class DropdownToggleDirective {

  constructor() { }

  onToggle = new EventEmitter()

  @HostListener('click')
  toggle(){
    this.onToggle.emit()
  }

}
