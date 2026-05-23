import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], search: string): any[] {
    if (!search) {
      return items;
    }

    return items.filter((item) => item.toLowerCase().includes(search.toLowerCase()));
  }
}
