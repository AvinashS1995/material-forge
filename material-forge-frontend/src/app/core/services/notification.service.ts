import { Injectable, inject, signal } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NotificationConfig, NotificationType, AppNotification } from '../models/notification.model';
import { SNACKBAR_DURATION } from '../constants/app.constants';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  readonly notifications = signal<AppNotification[]>([]);
  readonly unreadCount = signal<number>(0);

  success(message: string, action?: string, duration = SNACKBAR_DURATION.medium): void {
    this.show({ message, type: 'success', action, duration });
  }

  error(message: string, action?: string, duration = SNACKBAR_DURATION.long): void {
    this.show({ message, type: 'error', action, duration });
  }

  warning(message: string, action?: string, duration = SNACKBAR_DURATION.medium): void {
    this.show({ message, type: 'warning', action, duration });
  }

  info(message: string, action?: string, duration = SNACKBAR_DURATION.medium): void {
    this.show({ message, type: 'info', action, duration });
  }

  show(config: NotificationConfig): void {
    const panelClass = this.getPanelClass(config.type);
    const snackConfig: MatSnackBarConfig = {
      duration: config.duration ?? SNACKBAR_DURATION.medium,
      horizontalPosition: config.horizontalPosition ?? 'end',
      verticalPosition: config.verticalPosition ?? 'bottom',
      panelClass: ['mf-snackbar', panelClass],
    };
    this.snackBar.open(config.message, config.action ?? 'Close', snackConfig);
    this.addToHistory(config);
  }

  dismiss(): void {
    this.snackBar.dismiss();
  }

  addNotification(notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>): void {
    const newNotification: AppNotification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      read: false,
    };
    this.notifications.update((list) => [newNotification, ...list].slice(0, 50));
    this.updateUnreadCount();
  }

  markAllRead(): void {
    this.notifications.update((list) => list.map((n) => ({ ...n, read: true })));
    this.unreadCount.set(0);
  }

  markRead(id: string): void {
    this.notifications.update((list) =>
      list.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    this.updateUnreadCount();
  }

  clearAll(): void {
    this.notifications.set([]);
    this.unreadCount.set(0);
  }

  private addToHistory(config: NotificationConfig): void {
    this.addNotification({
      title: this.getTypeLabel(config.type),
      message: config.message,
      type: config.type,
    });
  }

  private getTypeLabel(type: NotificationType): string {
    const labels: Record<NotificationType, string> = {
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Information',
    };
    return labels[type];
  }

  private getPanelClass(type: NotificationType): string {
    const classes: Record<NotificationType, string> = {
      success: 'mf-snackbar--success',
      error: 'mf-snackbar--error',
      warning: 'mf-snackbar--warning',
      info: 'mf-snackbar--info',
    };
    return classes[type];
  }

  private updateUnreadCount(): void {
    this.unreadCount.set(this.notifications().filter((n) => !n.read).length);
  }
}
