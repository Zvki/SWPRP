import { Component } from '@angular/core';
import {ButtonDirective} from '../../shared/ui/button/button-directive';

@Component({
  selector: 'app-main',
  imports: [
    ButtonDirective
  ],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

}
