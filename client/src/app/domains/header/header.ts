import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {Button} from '../../shared/ui/button/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  standalone: true,
  imports: [
    RouterLink,
    Button
  ],
  styleUrl: './header.css'
})
export class Header {

  user: any = { name: 'Tester' };

  onLogout() {
    console.log('Wylogowano');
    this.user = null;
  }

}
