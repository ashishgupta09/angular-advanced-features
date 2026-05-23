import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortname',
  standalone: true,
})
export class ShortnamePipe implements PipeTransform {
  transform(value: string, limit: number = 5): string {
    return value.slice(0, limit);
  }
}
