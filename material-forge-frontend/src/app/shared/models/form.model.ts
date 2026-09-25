export type InputAppearance = 'fill' | 'outline';
export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time'
  | 'datetime-local';

export interface InputConfig {
  label?: string;
  placeholder?: string;
  hint?: string;
  type?: InputType;
  appearance?: InputAppearance;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  maxLength?: number;
  minLength?: number;
  min?: number | string;
  max?: number | string;
  prefix?: string;
  suffix?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  autocomplete?: string;
  ariaLabel?: string;
  errorMessages?: Record<string, string>;
}

export interface SelectOption<T = unknown> {
  label: string;
  value: T;
  disabled?: boolean;
  icon?: string;
  group?: string;
  description?: string;
}

export interface SelectConfig {
  label?: string;
  placeholder?: string;
  hint?: string;
  appearance?: InputAppearance;
  multiple?: boolean;
  searchable?: boolean;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  displayKey?: string;
  valueKey?: string;
  showSelectAll?: boolean;
  showClear?: boolean;
  emptyMessage?: string;
  errorMessages?: Record<string, string>;
}

export interface AutocompleteConfig {
  label?: string;
  placeholder?: string;
  hint?: string;
  appearance?: InputAppearance;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  debounceTime?: number;
  minSearchLength?: number;
  displayKey?: string;
  valueKey?: string;
  showClear?: boolean;
  noResultsMessage?: string;
  errorMessages?: Record<string, string>;
}

export interface CheckboxConfig {
  label?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  labelPosition?: 'before' | 'after';
  color?: 'primary' | 'accent' | 'warn';
}

export interface RadioOption<T = unknown> {
  label: string;
  value: T;
  disabled?: boolean;
  description?: string;
}

export interface RadioConfig {
  label?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  layout?: 'row' | 'column';
  color?: 'primary' | 'accent' | 'warn';
  labelPosition?: 'before' | 'after';
}

export interface SliderConfig {
  label?: string;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
  discrete?: boolean;
  showTickMarks?: boolean;
  disabled?: boolean;
  displayWith?: (value: number) => string;
}

export interface DatepickerConfig {
  label?: string;
  placeholder?: string;
  hint?: string;
  appearance?: InputAppearance;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  min?: Date;
  max?: Date;
  startView?: 'month' | 'year' | 'multi-year';
  touchUi?: boolean;
  errorMessages?: Record<string, string>;
}

export interface ChipsConfig {
  label?: string;
  placeholder?: string;
  hint?: string;
  appearance?: InputAppearance;
  required?: boolean;
  disabled?: boolean;
  separatorKeys?: number[];
  maxChips?: number;
  removable?: boolean;
  selectable?: boolean;
  errorMessages?: Record<string, string>;
}

export interface FileUploadConfig {
  label?: string;
  hint?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  dragDrop?: boolean;
  showPreview?: boolean;
  required?: boolean;
  disabled?: boolean;
  errorMessages?: Record<string, string>;
}

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress?: number;
  error?: string;
  previewUrl?: string;
  status?: 'pending' | 'uploading' | 'success' | 'error';
}
