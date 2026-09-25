import { FormGroup } from '@angular/forms';

export interface StepConfig {
  id: string;
  label: string;
  icon?: string;
  optional?: boolean;
  completed?: boolean;
  hasError?: boolean;
  editable?: boolean;
  formGroup?: FormGroup;
  description?: string;
}

export interface StepperConfig {
  linear?: boolean;
  orientation?: 'horizontal' | 'vertical';
  selectedIndex?: number;
  labelPosition?: 'bottom' | 'end';
  animationDuration?: string;
}
