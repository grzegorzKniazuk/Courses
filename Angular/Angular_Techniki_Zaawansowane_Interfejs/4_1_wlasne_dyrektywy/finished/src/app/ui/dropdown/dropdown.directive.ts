import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[dropdown]'
})
export class DropdownDirective {

  constructor(private elem: ElementRef) {
    // console.log('hello from dropdown!', this.elem)
  }

  ngOnInit(){
    let el = this.elem.nativeElement;

    let toggle = el.querySelector('.dropdown-toggle')
    let menu = el.querySelector('.dropdown-menu')

    menu.hidden = true;
    toggle.addEventListener('click',()=>{
      menu.hidden = !menu.hidden;
    })
  }

}
