import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ReusableButtonComponent } from '../../shared/components/reusable-button/reusable-button.component';
import { ThemeService } from '../../core/services/theme.service';
import { NotificationService } from '../../core/services/notification.service';
import { APP_NAME, APP_VERSION } from '../../core/constants/app.constants';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatSlideToggleModule, MatDividerModule,
    MatIconModule, MatButtonModule, MatChipsModule,
    PageHeaderComponent, ReusableButtonComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  readonly themeService = inject(ThemeService);
  private readonly notification = inject(NotificationService);

  readonly appName = APP_NAME;
  readonly appVersion = APP_VERSION;

  saveSettings(): void {
    this.notification.success('Settings saved successfully!');
  }

  readonly notifPrefs = [
    { id: 'success', label: 'Success Notifications', description: 'Show success toasts', enabled: true },
    { id: 'error', label: 'Error Notifications', description: 'Show error toasts', enabled: true },
    { id: 'warning', label: 'Warning Notifications', description: 'Show warning toasts', enabled: true },
    { id: 'info', label: 'Info Notifications', description: 'Show info toasts', enabled: false },
  ];

  readonly aboutInfo = [
    { label: 'Application', value: this.appName },
    { label: 'Version', value: this.appVersion },
    { label: 'Framework', value: 'Angular 20' },
    { label: 'UI Library', value: 'Angular Material 20' },
    { label: 'Tagline', value: 'Build Once. Reuse Everywhere.' },
  ];
}
