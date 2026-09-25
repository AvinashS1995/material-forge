import { Pipe, PipeTransform } from '@angular/core';
import { truncateText } from '../utils/format.utils';

@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 50, ellipsis = '...'): string {
    return truncateText(value, limit, ellipsis);
  }
}
