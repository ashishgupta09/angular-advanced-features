import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlynumber]',
  standalone: true,
})
export class Onlynumber {
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }
}
