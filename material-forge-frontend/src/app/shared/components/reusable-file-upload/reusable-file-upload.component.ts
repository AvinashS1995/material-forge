import {
  Component, Input, Output, EventEmitter, forwardRef,
  ChangeDetectionStrategy, signal, HostListener, ElementRef, inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UploadedFile } from '../../models/form.model';
import { formatFileSize } from '../../utils/format.utils';
import { FormatFileSizePipe } from '../../pipes/format-file-size.pipe';
import { MAX_FILE_SIZE_BYTES } from '../../../core/constants/app.constants';

@Component({
  selector: 'app-reusable-file-upload',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressBarModule, MatTooltipModule, FormatFileSizePipe],
  templateUrl: './reusable-file-upload.component.html',
  styleUrl: './reusable-file-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ReusableFileUploadComponent), multi: true },
  ],
})
export class ReusableFileUploadComponent implements ControlValueAccessor {
  @Input() label = 'Upload Files';
  @Input() hint = '';
  @Input() accept = '*/*';
  @Input() multiple = false;
  @Input() maxSize = MAX_FILE_SIZE_BYTES;
  @Input() maxFiles = 10;
  @Input() showPreview = true;
  @Input() disabled = false;
  @Input() dragDrop = true;
  @Input() control: AbstractControl | null = null;

  @Output() filesChange = new EventEmitter<UploadedFile[]>();
  @Output() fileError = new EventEmitter<string>();

  readonly files = signal<UploadedFile[]>([]);
  readonly isDragOver = signal(false);
  readonly errors = signal<string[]>([]);

  private onChange: (v: UploadedFile[]) => void = () => {};
  private onTouched: () => void = () => {};

  @HostListener('dragover', ['$event']) onDragOver(e: DragEvent): void {
    if (!this.dragDrop || this.disabled) return;
    e.preventDefault(); e.stopPropagation();
    this.isDragOver.set(true);
  }

  @HostListener('dragleave', ['$event']) onDragLeave(e: DragEvent): void {
    e.preventDefault(); this.isDragOver.set(false);
  }

  @HostListener('drop', ['$event']) onDrop(e: DragEvent): void {
    if (!this.dragDrop || this.disabled) return;
    e.preventDefault(); this.isDragOver.set(false);
    const files = Array.from(e.dataTransfer?.files ?? []);
    this.processFiles(files);
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    this.processFiles(files);
    input.value = '';
  }

  private processFiles(rawFiles: File[]): void {
    this.errors.set([]);
    const errs: string[] = [];
    const newFiles: UploadedFile[] = [];

    for (const file of rawFiles) {
      if (!this.multiple && newFiles.length >= 1) break;
      if (this.files().length + newFiles.length >= this.maxFiles) {
        errs.push(`Maximum ${this.maxFiles} files allowed`); break;
      }
      if (file.size > this.maxSize) {
        errs.push(`"${file.name}" exceeds max size of ${formatFileSize(this.maxSize)}`); continue;
      }
      if (this.accept !== '*/*') {
        const types = this.accept.split(',').map((t) => t.trim());
        const valid = types.some((t) =>
          t.startsWith('.') ? file.name.endsWith(t) : file.type.match(t.replace('*', '.*'))
        );
        if (!valid) { errs.push(`"${file.name}" is not an accepted file type`); continue; }
      }

      const uploaded: UploadedFile = {
        id: crypto.randomUUID(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'pending',
        progress: 0,
        previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      };
      newFiles.push(uploaded);
    }

    if (errs.length) {
      this.errors.set(errs);
      errs.forEach((e) => this.fileError.emit(e));
    }

    if (newFiles.length) {
      const updated = this.multiple ? [...this.files(), ...newFiles] : newFiles;
      this.files.set(updated);
      this.onChange(updated);
      this.onTouched();
      this.filesChange.emit(updated);
    }
  }

  removeFile(id: string): void {
    const updated = this.files().filter((f) => f.id !== id);
    this.files.set(updated);
    this.onChange(updated);
    this.filesChange.emit(updated);
  }

  get acceptDisplay(): string {
    return this.accept === '*/*' ? 'Any file' : this.accept;
  }

  writeValue(v: UploadedFile[]): void { this.files.set(v ?? []); }
  registerOnChange(fn: (v: UploadedFile[]) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { /* handled via disabled input */ }
}
