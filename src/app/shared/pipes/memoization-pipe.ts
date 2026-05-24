import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memoization',
  standalone: true,
})
export class MemoizationPipe implements PipeTransform {
  private cache = new Map<number, number>();

  transform(value: number): number {
    if (this.cache.has(value)) {
      console.log('FROM CACHE');
      return this.cache.get(value)!;
    }

    console.log('CALCULATING');
    const result = this.expensiveCalculation(value);
    this.cache.set(value, result);
    return result;
  }

  expensiveCalculation(num: number): number {
    let total = 0;
    for (let i = 0; i < 100000000; i++) {
      total += num;
    }
    return total;
  }
}
