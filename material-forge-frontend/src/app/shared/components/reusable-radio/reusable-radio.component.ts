import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { RadioOption } from '../../models/form.model';

@Component({
  selector: 'app-reusable-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule],
  template: `
    @if (label) { <div class="radio-label">{{ label }}</div> }
    <mat-radio-group [formControl]="internalControl" [color]="color" [attr.aria-label]="label"
      class="radio-group" [class.radio-group--row]="layout === 'row'"
      (change)="onChange($event.value)">
      @for (opt of options; track opt.value) {
        <mat-radio-button [value]="opt.value" [disabled]="opt.disabled ?? false">
          {{ opt.label }}
        </mat-radio-button>
      }
    </mat-radio-group>
    @if (hint) { <div class="mf-hint">{{ hint }}</div> }
  `,
  styles: [`
    .radio-label { font-size: 14px; color: rgba(0,0,0,.54); margin-bottom: 8px; }
    .radio-group { display: flex; flex-direction: column; gap: 4px; }
    .radio-group--row { flex-direction: row; flex-wrap: wrap; gap: 8px; }
    .mf-hint { font-size: 12px; color: rgba(0,0,0,.54); margin-top: 4px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ReusableRadioComponent), multi: true }],
})
export class ReusableRadioComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() hint = '';
  @Input() options: RadioOption[] = [];
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() layout: 'row' | 'column' = 'column';
  @Input() disabled = false;
  @Input() control: AbstractControl | null = null;

  readonly internalControl = new FormControl<unknown>(null);
  onChange: (v: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(v: unknown): void { this.internalControl.setValue(v, { emitEvent: false }); }
  registerOnChange(fn: (v: unknown) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { d ? this.internalControl.disable() : this.internalControl.enable(); }
}
