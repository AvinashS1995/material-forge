import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function getErrorMessage(
  control: AbstractControl | null,
  customMessages?: Record<string, string>
): string {
  if (!control || !control.errors || !control.touched) return '';

  const errors = control.errors;
  const defaults: Record<string, (err: ValidationErrors) => string> = {
    required: () => 'This field is required.',
    email: () => 'Please enter a valid email address.',
    minlength: (e) => `Minimum length is ${e['minlength'].requiredLength} characters.`,
    maxlength: (e) => `Maximum length is ${e['maxlength'].requiredLength} characters.`,
    min: (e) => `Minimum value is ${e['min'].min}.`,
    max: (e) => `Maximum value is ${e['max'].max}.`,
    pattern: () => 'Invalid format.',
    matDatepickerParse: () => 'Invalid date format.',
    matDatepickerMin: () => 'Date is before the minimum allowed date.',
    matDatepickerMax: () => 'Date is after the maximum allowed date.',
  };

  for (const key of Object.keys(errors)) {
    if (customMessages?.[key]) return customMessages[key];
    if (defaults[key]) return defaults[key](errors);
  }
  return 'Invalid value.';
}

export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return (control.value as string).trim().length === 0
      ? { whitespace: true }
      : null;
  };
}

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const phoneRegex = /^[+]?[\d\s\-().]{7,15}$/;
    return phoneRegex.test(control.value) ? null : { phone: true };
  };
}

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    try {
      new URL(control.value);
      return null;
    } catch {
      return { url: true };
    }
  };
}

export function fileSizeValidator(maxBytes: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File | null;
    if (!file) return null;
    return file.size > maxBytes ? { fileSize: { maxBytes, actualBytes: file.size } } : null;
  };
}

export function fileTypeValidator(allowedTypes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File | null;
    if (!file) return null;
    return allowedTypes.includes(file.type) ? null : { fileType: { allowed: allowedTypes, actual: file.type } };
  };
}
