import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSkeleton]',
  standalone: true,
})
export class Skeleton implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'background', '#e2e8f0');
    this.renderer.setStyle(this.el.nativeElement, 'height', '20px');
  }
}
