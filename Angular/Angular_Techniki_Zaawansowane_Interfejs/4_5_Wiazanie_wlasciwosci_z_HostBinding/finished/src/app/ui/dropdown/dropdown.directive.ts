import { Directive, ElementRef, Renderer2, ContentChild, HostListener, HostBinding } from '@angular/core';
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
  toggleElem: DropdownToggleDirective

  @ContentChild(DropdownMenuDirective, { read: DropdownMenuDirective })
  menu: DropdownMenuDirective

  @HostListener('keyup.escape')
  @HostListener('document:click',['$event.path'])
  exitDropdown(path = []){
    let isOutside = path.indexOf(this.elem.nativeElement) == -1

    if(isOutside){
      this.close()
    }
  }

  @HostBinding('class.show')
  opened = false

  open(){
    this.opened = true
    this.menu.opened = this.opened
  }

  close(){
    this.opened = false
    this.menu.opened = this.opened
  }

  toggle(){
    this.opened? this.close() : this.open()
  }

  ngAfterContentInit() {
    this.close()

    this.toggleElem.onToggle.subscribe(()=>{
        this.toggle()
    })
  }


  ngOnInit() {
  }

}
