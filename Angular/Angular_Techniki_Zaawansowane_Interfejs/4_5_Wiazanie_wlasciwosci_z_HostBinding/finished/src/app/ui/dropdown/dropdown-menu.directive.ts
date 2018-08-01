import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[dropdown-menu], .dropdown-menu',
  // host:{
  //   '[hidden]':'!opened'
  // }
})
export class DropdownMenuDirective {

  constructor() { }

  @HostBinding('attr.aria-expanded')
  @HostBinding('class.show')
  opened = false

}
