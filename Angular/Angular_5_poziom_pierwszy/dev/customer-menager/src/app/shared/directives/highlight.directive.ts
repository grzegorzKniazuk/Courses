import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseenter')
  public highlight(): void {
    this.elementRef.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseleave')
  public cancelHighlight(): void {
    this.elementRef.nativeElement.style.backgroundColor = null;
  }
}
