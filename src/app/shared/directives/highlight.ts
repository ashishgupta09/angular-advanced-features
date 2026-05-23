import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class Highlight {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('mouseenter')
  onMouseHover() {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'yellow');
  }

  @HostListener('mouseleave')
  OnMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'color');
  }
}
