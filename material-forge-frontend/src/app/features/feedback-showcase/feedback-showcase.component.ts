import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';
import { ReusableButtonComponent } from '../../shared/components/reusable-button/reusable-button.component';
import { NotificationService } from '../../core/services/notification.service';
import { DialogService } from '../../core/services/dialog.service';

@Component({
  selector: 'app-feedback-showcase',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatTooltipModule,
    MatBadgeModule, MatChipsModule, MatDividerModule,
    PageHeaderComponent, EmptyStateComponent, SkeletonLoaderComponent, ReusableButtonComponent,
  ],
  templateUrl: './feedback-showcase.component.html',
  styleUrl: './feedback-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackShowcaseComponent {
  private readonly notification = inject(NotificationService);
  private readonly dialogService = inject(DialogService);

  readonly progressValue = signal(65);
  readonly showSkeleton = signal(true);

  showSuccess(): void { this.notification.success('Operation completed successfully!'); }
  showError(): void   { this.notification.error('An error occurred. Please try again.'); }
  showWarning(): void { this.notification.warning('This action cannot be undone.'); }
  showInfo(): void    { this.notification.info('New update available. Refresh to apply.'); }

  showConfirm(): void {
    this.dialogService.confirm({
      title: 'Confirm Action',
      message: 'Are you sure you want to proceed with this action? This cannot be undone.',
      type: 'warning',
      confirmText: 'Yes, Proceed',
      cancelText: 'Cancel',
    }).subscribe((result) => {
      if (result) this.notification.success('Action confirmed!');
      else this.notification.info('Action cancelled.');
    });
  }

  toggleSkeleton(): void { this.showSkeleton.update((v) => !v); }
  setProgress(v: number): void { this.progressValue.set(v); }
}
