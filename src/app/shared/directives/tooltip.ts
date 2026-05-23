import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class Tooltip {
  @Input() appTooltip = '';

  @HostListener('mouseenter')
  showToolTip() {
    console.log(this.appTooltip);
  }
}
