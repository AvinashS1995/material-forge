import {
  Component, inject, ChangeDetectionStrategy, signal,
  Output, EventEmitter, HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ThemeService } from '../../core/services/theme.service';
import { SearchService } from '../../core/services/search.service';
import { NotificationService } from '../../core/services/notification.service';
import { LayoutService } from '../../core/services/layout.service';
import { APP_NAME } from '../../core/constants/app.constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule,
    MatToolbarModule, MatButtonModule, MatIconModule,
    MatTooltipModule, MatMenuModule, MatBadgeModule,
    MatInputModule, MatFormFieldModule, MatDividerModule, MatListModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly themeService = inject(ThemeService);
  readonly searchService = inject(SearchService);
  readonly notificationService = inject(NotificationService);
  readonly layoutService = inject(LayoutService);

  readonly appName = APP_NAME;
  readonly searchControl = new FormControl('');
  readonly showMobileSearch = signal(false);

  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
    ).subscribe((q) => {
      this.searchService.search(q ?? '');
      if (q && q.length >= 2) this.searchService.open();
      else this.searchService.close();
    });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.searchService.close();
    this.showMobileSearch.set(false);
  }

  toggleMobileSearch(): void {
    this.showMobileSearch.update((v) => !v);
    if (!this.showMobileSearch()) {
      this.clearSearch();
    }
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.searchService.close();
  }

  navigateToResult(route: string): void {
    this.searchService.close();
    this.clearSearch();
    this.showMobileSearch.set(false);
  }

  markAllNotificationsRead(): void {
    this.notificationService.markAllRead();
  }

  clearNotifications(): void {
    this.notificationService.clearAll();
  }
}
