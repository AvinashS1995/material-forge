import {
  Component, Input, forwardRef, ChangeDetectionStrategy,
  signal, OnChanges, SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl,
  ReactiveFormsModule, AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InputAppearance, InputType } from '../../models/form.model';
import { getErrorMessage } from '../../utils/form.utils';

@Component({
  selector: 'app-reusable-input',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,
  ],
  templateUrl: './reusable-input.component.html',
  styleUrl: './reusable-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReusableInputComponent),
      multi: true,
    },
  ],
})
export class ReusableInputComponent implements ControlValueAccessor, OnChanges {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() hint = '';
  @Input() type: InputType = 'text';
  @Input() appearance: InputAppearance = 'outline';
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() maxLength?: number;
  @Input() minLength?: number;
  @Input() prefixIcon = '';
  @Input() suffixIcon = '';
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() autocomplete = 'off';
  @Input() ariaLabel = '';
  @Input() errorMessages: Record<string, string> = {};
  @Input() control: AbstractControl | null = null;
  @Input() showPasswordToggle = false;

  readonly internalControl = new FormControl<string>('');
  readonly showPassword = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get effectiveType(): InputType {
    if (this.type === 'password' && this.showPassword()) return 'text';
    return this.type;
  }

  get activeControl(): AbstractControl | null {
    return this.control ?? this.internalControl;
  }

  get errorMessage(): string {
    return getErrorMessage(this.activeControl, this.errorMessages);
  }

  get hasError(): boolean {
    const ctrl = this.activeControl;
    return !!(ctrl?.invalid && ctrl.touched);
  }

  get charCount(): number {
    return String(this.internalControl.value ?? '').length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      if (this.disabled) {
        this.internalControl.disable({ emitEvent: false });
      } else {
        this.internalControl.enable({ emitEvent: false });
      }
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor
  writeValue(value: string): void {
    this.internalControl.setValue(value ?? '', { emitEvent: false });
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
    this.internalControl.valueChanges.subscribe((v) => fn(v ?? ''));
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.internalControl.disable({ emitEvent: false });
    } else {
      this.internalControl.enable({ emitEvent: false });
    }
  }
}
