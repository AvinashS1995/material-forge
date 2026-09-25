export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationConfig {
  message: string;
  type: NotificationType;
  duration?: number;
  action?: string;
  horizontalPosition?: 'start' | 'center' | 'end' | 'left' | 'right';
  verticalPosition?: 'top' | 'bottom';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  read: boolean;
}
