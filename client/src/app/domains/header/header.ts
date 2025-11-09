import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Theme} from '../../core/services/theme';
import {ButtonDirective} from '../../shared/ui/button/button-directive';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {SigninDialog} from './signin-dialog/signin-dialog';
import {AuthService} from '../../core/services/api/auth.service';
import {UserData} from '../../core/interfaces/user-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  standalone: true,
  imports: [
    RouterLink,
    ButtonDirective,
    MatDialogModule
  ],
  styleUrl: './header.css'
})
export class Header {
  private readonly dialog = inject(MatDialog);
  protected readonly authService = inject(AuthService);
  protected readonly themeService = inject(Theme)

  user: UserData | null = this.authService.getUserStore;

  onLogout() {
    console.log('Wylogowano');
    this.authService.logout();
  }

  protected toggleLoginDialog(): void {
    const dialogRef = this.dialog.open(SigninDialog,{
      panelClass: "bg-background"
    })
  }

}
