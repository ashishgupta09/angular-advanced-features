import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination',
  standalone: true,
})
export class PaginationPipe implements PipeTransform {
  transform(items: any[], currentPage: number, itemsPerPage: number): any[] {
    if (!items) {
      return [];
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }
}
