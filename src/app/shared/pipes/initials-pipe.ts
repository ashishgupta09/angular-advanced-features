import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split(' ')
      .map((x) => x[0])
      .join('');
  }
}
