import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date): string {
    const seconds = Math.floor((new Date().getTime() - new Date(value).getTime()) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ago`;
    }

    if (minutes > 0) {
      return `${minutes}m ago`;
    }

    return 'Just now';
  }
}
