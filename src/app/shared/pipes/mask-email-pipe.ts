import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskEmail',
  standalone: true,
})
export class MaskEmailPipe implements PipeTransform {
  transform(email: string): string {
    const parts = email.split('@');
    return parts[0].slice(0, 2) + '****@' + parts[1];
  }
}
