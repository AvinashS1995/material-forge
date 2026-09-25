import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { DialogConfig, DialogResult, ConfirmDialogData } from '../models/dialog.model';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private readonly matDialog = inject(MatDialog);

  open<T = unknown, R = unknown>(
    component: ComponentType<T>,
    config?: DialogConfig
  ): MatDialogRef<T, R> {
    const dialogConfig: MatDialogConfig = {
      width: config?.width ?? '600px',
      maxWidth: config?.maxWidth ?? '95vw',
      height: config?.height,
      maxHeight: config?.maxHeight ?? '90vh',
      data: config?.data,
      disableClose: config?.disableClose ?? false,
      panelClass: ['mf-dialog', ...(Array.isArray(config?.panelClass)
        ? (config.panelClass as string[])
        : config?.panelClass
        ? [config.panelClass as string]
        : [])],
      hasBackdrop: config?.hasBackdrop ?? true,
      backdropClass: config?.backdropClass,
      autoFocus: true,
      restoreFocus: true,
    };

    if (config?.fullScreen) {
      dialogConfig.width = '100vw';
      dialogConfig.height = '100vh';
      dialogConfig.maxWidth = '100vw';
      dialogConfig.maxHeight = '100vh';
      dialogConfig.panelClass = [...(dialogConfig.panelClass as string[]), 'mf-dialog--fullscreen'];
    }

    return this.matDialog.open<T, unknown, R>(component, dialogConfig);
  }

  confirm(data: ConfirmDialogData): Observable<boolean> {
    // Dynamically import to avoid circular deps — resolved at runtime
    return new Observable<boolean>((observer) => {
      import('../../shared/components/confirm-dialog/confirm-dialog.component').then(
        (m) => {
          const ref = this.matDialog.open(m.ConfirmDialogComponent, {
            width: '400px',
            maxWidth: '95vw',
            data,
            disableClose: false,
            panelClass: 'mf-dialog',
          });
          ref.afterClosed().subscribe((result: boolean) => {
            observer.next(!!result);
            observer.complete();
          });
        }
      );
    });
  }

  closeAll(): void {
    this.matDialog.closeAll();
  }

  getOpenDialogs(): MatDialogRef<unknown>[] {
    return this.matDialog.openDialogs;
  }
}
