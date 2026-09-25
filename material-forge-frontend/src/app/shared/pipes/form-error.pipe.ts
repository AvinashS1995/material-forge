import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { getErrorMessage } from '../utils/form.utils';

@Pipe({ name: 'formError', standalone: true, pure: false })
export class FormErrorPipe implements PipeTransform {
  transform(control: AbstractControl | null, customMessages?: Record<string, string>): string {
    return getErrorMessage(control, customMessages);
  }
}
