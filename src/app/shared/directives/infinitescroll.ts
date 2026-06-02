import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true,
})
export class Infinitescroll {
  @Output() scrolled = new EventEmitter();

  @HostListener('window:scroll')
  onScroll() {
    const height = window.innerHeight + window.scrollY;
    if (height >= document.body.offsetHeight) {
      this.scrolled.emit();
    }
  }
}
