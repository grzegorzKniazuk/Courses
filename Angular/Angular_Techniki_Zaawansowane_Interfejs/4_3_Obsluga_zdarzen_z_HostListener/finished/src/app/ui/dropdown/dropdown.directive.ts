import { Directive, ElementRef, Renderer2, ContentChild } from '@angular/core';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownMenuDirective } from './dropdown-menu.directive';

@Directive({
  selector: '[dropdown]'
})
export class DropdownDirective {

  constructor(private elem: ElementRef,
    private renderer: Renderer2) {
  }

  @ContentChild(DropdownToggleDirective, { 
    read: DropdownToggleDirective 
  })
  toggle: DropdownToggleDirective

  @ContentChild(DropdownMenuDirective, { read: ElementRef })
  menu: ElementRef

  ngAfterContentInit() {

    this.toggle.onToggle.subscribe(()=>{
        this.renderer.setProperty(menu, 'hidden', !menu.hidden)
    })


    let menu = this.menu.nativeElement

    menu.hidden = true;

    this.renderer.setProperty(menu, 'hidden', true)

  }


  ngOnInit() {
  }

}
