import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-reusable-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule],
  template: `
    <mat-checkbox
      [formControl]="internalControl"
      [color]="color"
      [labelPosition]="labelPosition"
      [indeterminate]="indeterminate"
      [attr.aria-label]="label"
      (change)="onCheckChange($event.checked)">
      {{ label }}
    </mat-checkbox>
    @if (hint) { <div class="mf-hint">{{ hint }}</div> }
  `,
  styles: [`.mf-hint { font-size: 12px; color: rgba(0,0,0,.54); margin-top: 4px; margin-left: 36px; }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ReusableCheckboxComponent), multi: true }],
})
export class ReusableCheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() hint = '';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() labelPosition: 'before' | 'after' = 'after';
  @Input() indeterminate = false;
  @Input() disabled = false;
  @Input() control: AbstractControl | null = null;

  readonly internalControl = new FormControl(false);
  private onChange: (v: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  onCheckChange(checked: boolean): void { this.onChange(checked); this.onTouched(); }

  writeValue(v: boolean): void { this.internalControl.setValue(v, { emitEvent: false }); }
  registerOnChange(fn: (v: boolean) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { d ? this.internalControl.disable() : this.internalControl.enable(); }
}
