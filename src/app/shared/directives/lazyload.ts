import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLazyload]',
  standalone: true,
})
export class Lazyload implements OnInit {
  @Input() appLazyLoad!: string;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const img = this.el.nativeElement;
    img.src = this.appLazyLoad;
  }
}
