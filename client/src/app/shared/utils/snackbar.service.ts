import {inject, Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

type NotificationType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly _snackbar = inject(MatSnackBar)

  private showSnackbar(message: string, type: NotificationType, duration: number = 3000): void {
    const config: MatSnackBarConfig = {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [`snackbar-${type}`]
    }

    const action = 'Zamknij';

    this._snackbar.open(message, action, config);
  }

  public success(message: string, duration?: number): void {
    this.showSnackbar(message, 'success', duration);
  }

  public error(message: string, duration?: number): void {
    this.showSnackbar(message, 'error', duration || 5000);
  }

  public info(message: string, duration?: number): void {
    this.showSnackbar(message, 'info', duration);
  }
}
