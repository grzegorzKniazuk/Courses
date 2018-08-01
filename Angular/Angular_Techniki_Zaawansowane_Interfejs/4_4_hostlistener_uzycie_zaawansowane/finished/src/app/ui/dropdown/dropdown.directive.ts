import { Directive, ElementRef, Renderer2, ContentChild, HostListener } from '@angular/core';
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

  @HostListener('keyup.escape')
  @HostListener('document:click',['$event.path'])
  exitDropdown(path = []){
    let isOutside = path.indexOf(this.elem.nativeElement) == -1

    if(isOutside){
      let menu = this.menu.nativeElement
      this.renderer.setProperty(menu, 'hidden', true)
    }
  }

  ngAfterContentInit() {
    let menu = this.menu.nativeElement
    this.renderer.setProperty(menu, 'hidden', true)

    this.toggle.onToggle.subscribe(()=>{
        this.renderer.setProperty(menu, 'hidden', !menu.hidden)
    })
  }


  ngOnInit() {
  }

}
