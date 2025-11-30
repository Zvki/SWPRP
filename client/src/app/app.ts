import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './domains/header/header';
import {AuthService} from './core/services/api/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  providers: [],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App implements OnInit {

  private readonly authService = inject(AuthService);

  public ngOnInit(): void {
    this.authService.initUser();
  }
}
