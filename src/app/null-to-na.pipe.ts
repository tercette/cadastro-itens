import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullToNA',
  standalone: true
})
export class NullToNAPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): any {
    return value !== null && value !== undefined ? value : 'N/A';
  }
}
