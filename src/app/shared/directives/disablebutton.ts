import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDisablebutton]',
  standalone: true
})
export class Disablebutton {
  constructor(private el: ElementRef) {}

  @HostListener('click')
  onClick() {
    this.el.nativeElement.disabled = true;
  }
}
