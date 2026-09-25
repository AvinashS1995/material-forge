import {
  Component, Input, Output, EventEmitter, forwardRef,
  ChangeDetectionStrategy, signal, ViewChild, ElementRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { InputAppearance } from '../../models/form.model';

@Component({
  selector: 'app-reusable-chips',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatChipsModule, MatFormFieldModule, MatIconModule, MatAutocompleteModule,
  ],
  templateUrl: './reusable-chips.component.html',
  styleUrl: './reusable-chips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ReusableChipsComponent), multi: true },
  ],
})
export class ReusableChipsComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = 'Add tag...';
  @Input() hint = '';
  @Input() appearance: InputAppearance = 'outline';
  @Input() required = false;
  @Input() disabled = false;
  @Input() maxChips?: number;
  @Input() removable = true;
  @Input() suggestions: string[] = [];
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() control: AbstractControl | null = null;

  @Output() chipsChange = new EventEmitter<string[]>();

  @ViewChild('chipInput') chipInputRef!: ElementRef<HTMLInputElement>;

  readonly separatorKeysCodes = [ENTER, COMMA];
  readonly chips = signal<string[]>([]);
  readonly inputControl = new FormControl('');
  readonly filteredSuggestions = signal<string[]>([]);

  private onChange: (v: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  get canAdd(): boolean {
    return !this.maxChips || this.chips().length < this.maxChips;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value ?? '').trim();
    if (value && this.canAdd && !this.chips().includes(value)) {
      this.chips.update((c) => [...c, value]);
      this.emitChange();
    }
    event.chipInput!.clear();
    this.inputControl.setValue('');
  }

  remove(chip: string): void {
    this.chips.update((c) => c.filter((x) => x !== chip));
    this.emitChange();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (value && this.canAdd && !this.chips().includes(value)) {
      this.chips.update((c) => [...c, value]);
      this.emitChange();
    }
    if (this.chipInputRef) this.chipInputRef.nativeElement.value = '';
    this.inputControl.setValue('');
  }

  onInput(): void {
    const q = (this.inputControl.value ?? '').toLowerCase();
    this.filteredSuggestions.set(
      this.suggestions.filter((s) => s.toLowerCase().includes(q) && !this.chips().includes(s))
    );
  }

  private emitChange(): void {
    const val = this.chips();
    this.onChange(val);
    this.onTouched();
    this.chipsChange.emit(val);
  }

  writeValue(v: string[]): void { this.chips.set(v ?? []); }
  registerOnChange(fn: (v: string[]) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { d ? this.inputControl.disable() : this.inputControl.enable(); }
}
