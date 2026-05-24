import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLazyload]',
  standalone: true,
})
export class Lazyload implements OnInit {
  @Input()
  appLazyLoad!: string;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = this.el.nativeElement;
          img.src = this.appLazyLoad;
          observer.unobserve(img);
        }
      });
    });
    observer.observe(this.el.nativeElement);
  }
}
