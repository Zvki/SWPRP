import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './domains/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  providers: [],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {}
