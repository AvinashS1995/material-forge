import { ComponentRef, Type } from '@angular/core';

export interface DialogConfig<T = unknown> {
  title?: string;
  component?: Type<unknown>;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  data?: T;
  disableClose?: boolean;
  panelClass?: string | string[];
  hasBackdrop?: boolean;
  backdropClass?: string;
  closeButton?: boolean;
  fullScreen?: boolean;
}

export interface DialogResult<T = unknown> {
  confirmed: boolean;
  data?: T;
}

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'danger' | 'success';
}
