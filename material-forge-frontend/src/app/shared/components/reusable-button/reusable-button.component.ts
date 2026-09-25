import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, signal, computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonVariant, ButtonColor, ButtonSize, ButtonType } from '../../models/button.model';

@Component({
  selector: 'app-reusable-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './reusable-button.component.html',
  styleUrl: './reusable-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReusableButtonComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() color: ButtonColor = 'primary';
  @Input() variant: ButtonVariant = 'flat';
  @Input() size: ButtonSize = 'medium';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() tooltip = '';
  @Input() ariaLabel = '';
  @Input() fullWidth = false;

  @Output() clicked = new EventEmitter<MouseEvent>();

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  get hostClass(): string {
    return [
      'mf-btn',
      `mf-btn--${this.size}`,
      this.fullWidth ? 'mf-btn--full' : '',
    ].filter(Boolean).join(' ');
  }

  get spinnerDiameter(): number {
    return this.size === 'small' ? 16 : this.size === 'large' ? 24 : 20;
  }

  onClick(event: MouseEvent): void {
    if (!this.isDisabled) {
      this.clicked.emit(event);
    }
  }
}
