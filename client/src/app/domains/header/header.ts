import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Theme} from '../../core/services/theme';
import {ButtonDirective} from '../../shared/ui/button/button-directive';
import {MatDialogModule} from '@angular/material/dialog';
import {AuthService} from '../../core/services/api/auth.service';
import {KeycloakService} from '../../core/services/auth/keycloak.service';

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
  protected readonly authService = inject(AuthService);
  protected readonly themeService = inject(Theme)

  user = this.authService.user;

  protected onLogout() {
    this.authService.logout();
  }
}
