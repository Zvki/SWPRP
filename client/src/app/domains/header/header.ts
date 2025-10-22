import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Theme} from '../../core/services/theme';
import {ButtonDirective} from '../../shared/ui/button/button-directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  standalone: true,
  imports: [
    RouterLink,
    ButtonDirective
  ],
  styleUrl: './header.css'
})
export class Header {
  protected readonly themeService = inject(Theme)

  user: any = { name: 'Tester' };

  onLogout() {
    console.log('Wylogowano');
    this.user = null;
  }

}
