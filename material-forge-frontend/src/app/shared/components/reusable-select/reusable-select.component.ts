import {
  Component, Input, Output, EventEmitter, forwardRef,
  ChangeDetectionStrategy, signal, computed, OnChanges, SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl,
  ReactiveFormsModule, AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { SelectOption, InputAppearance } from '../../models/form.model';
import { getErrorMessage } from '../../utils/form.utils';

@Component({
  selector: 'app-reusable-select',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatSelectModule, MatInputModule,
    MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, MatButtonModule,
  ],
  templateUrl: './reusable-select.component.html',
  styleUrl: './reusable-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReusableSelectComponent),
      multi: true,
    },
  ],
})
export class ReusableSelectComponent implements ControlValueAccessor, OnChanges {
  @Input() label = '';
  @Input() placeholder = 'Select an option';
  @Input() hint = '';
  @Input() appearance: InputAppearance = 'outline';
  @Input() multiple = false;
  @Input() searchable = false;
  @Input() required = false;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() options: SelectOption[] = [];
  @Input() displayKey = 'label';
  @Input() valueKey = 'value';
  @Input() showSelectAll = false;
  @Input() showClear = false;
  @Input() emptyMessage = 'No options available';
  @Input() errorMessages: Record<string, string> = {};
  @Input() control: AbstractControl | null = null;

  @Output() selectionChange = new EventEmitter<unknown>();

  readonly internalControl = new FormControl<unknown>(null);
  readonly searchQuery = signal('');

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  readonly filteredOptions = computed(() => {
    const q = this.searchQuery().toLowerCase();
    if (!q) return this.options;
    return this.options.filter((opt) =>
      String(opt.label).toLowerCase().includes(q)
    );
  });

  readonly allSelected = computed(() => {
    const val = this.internalControl.value as unknown[];
    return Array.isArray(val) && val.length === this.filteredOptions().length;
  });

  readonly someSelected = computed(() => {
    const val = this.internalControl.value as unknown[];
    return Array.isArray(val) && val.length > 0 && !this.allSelected();
  });

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      if (this.disabled) this.internalControl.disable({ emitEvent: false });
      else this.internalControl.enable({ emitEvent: false });
    }
  }

  onSearchChange(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  onSelectAll(checked: boolean): void {
    if (checked) {
      const allValues = this.filteredOptions().map((o) => o.value);
      this.internalControl.setValue(allValues);
      this.onChange(allValues);
    } else {
      this.internalControl.setValue([]);
      this.onChange([]);
    }
  }

  onClear(event: Event): void {
    event.stopPropagation();
    const empty = this.multiple ? [] : null;
    this.internalControl.setValue(empty);
    this.onChange(empty);
    this.selectionChange.emit(empty);
  }

  onSelectionChange(value: unknown): void {
    this.onChange(value);
    this.selectionChange.emit(value);
  }

  onBlur(): void { this.onTouched(); }

  writeValue(value: unknown): void {
    this.internalControl.setValue(value ?? (this.multiple ? [] : null), { emitEvent: false });
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
    this.internalControl.valueChanges.subscribe((v) => fn(v));
  }

  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) this.internalControl.disable({ emitEvent: false });
    else this.internalControl.enable({ emitEvent: false });
  }
}
