import {
  Component, Input, Output, EventEmitter, forwardRef,
  ChangeDetectionStrategy, signal, OnInit, OnDestroy, inject,
} from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl,
  ReactiveFormsModule, AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { SelectOption, InputAppearance } from '../../models/form.model';
import { getErrorMessage } from '../../utils/form.utils';
import { DEBOUNCE_TIME } from '../../../core/constants/app.constants';

@Component({
  selector: 'app-reusable-autocomplete',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatAutocompleteModule,
    MatIconModule, MatProgressSpinnerModule, MatButtonModule,
  ],
  templateUrl: './reusable-autocomplete.component.html',
  styleUrl: './reusable-autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReusableAutocompleteComponent),
      multi: true,
    },
  ],
})
export class ReusableAutocompleteComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() label = '';
  @Input() placeholder = 'Type to search...';
  @Input() hint = '';
  @Input() appearance: InputAppearance = 'outline';
  @Input() required = false;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() options: SelectOption[] = [];
  @Input() displayKey = 'label';
  @Input() valueKey = 'value';
  @Input() debounceMs = DEBOUNCE_TIME;
  @Input() minSearchLength = 1;
  @Input() showClear = true;
  @Input() noResultsMessage = 'No results found';
  @Input() errorMessages: Record<string, string> = {};
  @Input() control: AbstractControl | null = null;

  @Output() searchChange = new EventEmitter<string>();
  @Output() optionSelected = new EventEmitter<SelectOption>();

  readonly searchControl = new FormControl<string>('');
  readonly filteredOptions = signal<SelectOption[]>([]);
  readonly isLoading = signal(false);

  private readonly destroy$ = new Subject<void>();
  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};
  private selectedValue: unknown = null;

  get activeControl(): AbstractControl | null {
    return this.control ?? this.searchControl;
  }

  get errorMessage(): string {
    return getErrorMessage(this.activeControl, this.errorMessages);
  }

  get hasError(): boolean {
    const ctrl = this.activeControl;
    return !!(ctrl?.invalid && ctrl.touched);
  }

  get hasValue(): boolean {
    return this.selectedValue !== null && this.selectedValue !== '';
  }

  ngOnInit(): void {
    this.filteredOptions.set(this.options);

    this.searchControl.valueChanges.pipe(
      debounceTime(this.debounceMs),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    ).subscribe((query) => {
      const q = (query ?? '').toLowerCase();
      if (q.length < this.minSearchLength) {
        this.filteredOptions.set(this.options);
      } else {
        this.filteredOptions.set(
          this.options.filter((opt) => opt.label.toLowerCase().includes(q))
        );
      }
      this.searchChange.emit(query ?? '');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  displayFn = (value: unknown): string => {
    if (value === null || value === undefined || value === '') return '';
    const opt = this.options.find((o) => o.value === value);
    return opt ? opt.label : String(value);
  };

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    this.selectedValue = value;
    this.onChange(value);
    const opt = this.options.find((o) => o.value === value);
    if (opt) this.optionSelected.emit(opt);
  }

  onClear(): void {
    this.searchControl.setValue('');
    this.selectedValue = null;
    this.onChange(null);
    this.filteredOptions.set(this.options);
  }

  onBlur(): void { this.onTouched(); }

  writeValue(value: unknown): void {
    this.selectedValue = value;
    const opt = this.options.find((o) => o.value === value);
    this.searchControl.setValue(opt ? opt.label : (value ? String(value) : ''), { emitEvent: false });
  }

  registerOnChange(fn: (value: unknown) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) this.searchControl.disable({ emitEvent: false });
    else this.searchControl.enable({ emitEvent: false });
  }
}
