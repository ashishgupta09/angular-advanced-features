import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, field: string): any[] {
    if (!searchText) {
      return items;
    }

    return items.filter((item) => item[field]?.toLowerCase().includes(searchText.toLowerCase()));
  }
}
