import { Pipe, PipeTransform } from '@angular/core';
import { formatFileSize } from '../utils/format.utils';

@Pipe({ name: 'formatFileSize', standalone: true })
export class FormatFileSizePipe implements PipeTransform {
  transform(bytes: number): string {
    return formatFileSize(bytes);
  }
}
