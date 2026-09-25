import { Component, Input, forwardRef, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { InputAppearance } from '../../models/form.model';
import { getErrorMessage } from '../../utils/form.utils';

@Component({
  selector: 'app-reusable-datepicker',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule, MatIconModule,
  ],
  templateUrl: './reusable-datepicker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ReusableDatepickerComponent), multi: true },
  ],
})
export class ReusableDatepickerComponent implements ControlValueAccessor, OnChanges {
  @Input() label = '';
  @Input() placeholder = 'MM/DD/YYYY';
  @Input() hint = '';
  @Input() appearance: InputAppearance = 'outline';
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() min?: Date;
  @Input() max?: Date;
  @Input() startView: 'month' | 'year' | 'multi-year' = 'month';
  @Input() touchUi = false;
  @Input() errorMessages: Record<string, string> = {};
  @Input() control: AbstractControl | null = null;

  readonly internalControl = new FormControl<Date | null>(null);
  private onChange: (v: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  get activeControl(): AbstractControl | null { return this.control ?? this.internalControl; }

  get errorMessage(): string { return getErrorMessage(this.activeControl, this.errorMessages); }

  get hasError(): boolean {
    const ctrl = this.activeControl;
    return !!(ctrl?.invalid && ctrl.touched);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.disabled ? this.internalControl.disable() : this.internalControl.enable();
    }
  }

  onBlur(): void { this.onTouched(); }

  writeValue(v: Date | null): void { this.internalControl.setValue(v, { emitEvent: false }); }
  registerOnChange(fn: (v: Date | null) => void): void {
    this.onChange = fn;
    this.internalControl.valueChanges.subscribe((v) => fn(v));
  }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { d ? this.internalControl.disable() : this.internalControl.enable(); }
}
