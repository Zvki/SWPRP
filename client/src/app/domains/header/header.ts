import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrl: './header.css'
})
export class Header {

  user: any = { name: 'Tester' };
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onLogout() {
    console.log('Wylogowano');
    this.user = null;
  }

}
