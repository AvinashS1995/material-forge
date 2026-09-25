import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-reusable-slider',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSliderModule],
  template: `
    @if (label) {
      <div class="slider-label">
        <span>{{ label }}</span>
        <strong class="slider-value">{{ internalControl.value }}{{ unit }}</strong>
      </div>
    }
    <mat-slider [min]="min" [max]="max" [step]="step" [discrete]="discrete"
      [showTickMarks]="showTickMarks" [disabled]="disabled" class="slider">
      <input matSliderThumb [formControl]="internalControl" (valueChange)="onSliderChange($event)" />
    </mat-slider>
    @if (hint) { <div class="mf-hint">{{ hint }}</div> }
  `,
  styles: [`
    .slider-label { display: flex; justify-content: space-between; align-items: center; font-size: 14px; margin-bottom: 4px; }
    .slider-value { color: var(--mat-primary, #3f51b5); }
    .slider { width: 100%; }
    .mf-hint { font-size: 12px; color: rgba(0,0,0,.54); margin-top: 4px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ReusableSliderComponent), multi: true }],
})
export class ReusableSliderComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() hint = '';
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() unit = '';
  @Input() discrete = true;
  @Input() showTickMarks = false;
  @Input() disabled = false;
  @Input() control: AbstractControl | null = null;

  readonly internalControl = new FormControl<number>(0);
  private onChange: (v: number) => void = () => {};
  private onTouched: () => void = () => {};

  onSliderChange(value: number): void { this.onChange(value); this.onTouched(); }

  writeValue(v: number): void { this.internalControl.setValue(v ?? 0, { emitEvent: false }); }
  registerOnChange(fn: (v: number) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { d ? this.internalControl.disable() : this.internalControl.enable(); }
}
