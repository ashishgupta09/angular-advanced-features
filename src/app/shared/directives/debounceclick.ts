import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDebounceclick]',
  standalone: true,
})
export class Debounceclick {
  @Output() debounceClick = new EventEmitter();
  private timeout: any;

  @HostListener('click')
  clickEvent() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.debounceClick.emit();
    }, 1000);
  }
}
