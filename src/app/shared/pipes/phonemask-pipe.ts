import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonemask',
  standalone: true,
})
export class PhonemaskPipe implements PipeTransform {
  transform(value: string): string {
    return value.slice(0, 3) + '-' + value.slice(4, 6) + '-' + value.slice(6);
  }
}
