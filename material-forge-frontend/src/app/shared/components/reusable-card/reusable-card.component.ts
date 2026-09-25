import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CardConfig, CardAction } from '../../models/card.model';

@Component({
  selector: 'app-reusable-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './reusable-card.component.html',
  styleUrl: './reusable-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReusableCardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() image = '';
  @Input() imageAlt = '';
  @Input() elevation = 1;
  @Input() outlined = false;
  @Input() clickable = false;
  @Input() loading = false;
  @Input() headerIcon = '';
  @Input() headerIconColor = '';
  @Input() actions: CardAction[] = [];

  @Output() cardClick = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<string>();

  onCardClick(): void {
    if (this.clickable) this.cardClick.emit();
  }

  onActionClick(id: string): void {
    this.actionClick.emit(id);
  }
}
