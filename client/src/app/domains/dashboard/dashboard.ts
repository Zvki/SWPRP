import { Component } from '@angular/core';
import {ProjectCard} from './components/project-card/project-card';
import {ButtonDirective} from '../../shared/ui/button/button-directive';
import {Status} from './const/status';

export interface Project {
  id: number;
  title: string;
  author: string[];
  status: Status;
  progress: number;
  deadline: string;
  category: string;
}


@Component({
  selector: 'app-dashboard',
  imports: [
    ProjectCard,
    ButtonDirective
  ],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.css'
})
export class Dashboard {
  protected projects: Project[] = [
    {
      id: 1,
      title: 'System rezerwacji sal konferencyjnych',
      author: ['Jan Kowalski', 'Bartłomiej Kawecki'],
      status: 'in-progress',
      progress: 75,
      deadline: '31.01.2026',
      category: 'Praca inżynierska',
    },
    {
      id: 2,
      title: 'Analiza sentymentu opinii produktowych z użyciem AI',
      author: ['Anna Nowak'],
      status: 'danger',
      progress: 100,
      deadline: '15.10.2025',
      category: 'Praca magisterska',
    },
    {
      id: 3,
      title: 'Aplikacja mobilna do zarządzania budżetem domowym',
      author: ['Piotr Wiśniewski'],
      status: 'success',
      progress: 20,
      deadline: '20.12.2025',
      category: 'Projekt zespołowy',
    },
    {
      id: 4,
      title: 'Platforma e-learningowa dla programistów',
      author: ['Katarzyna Wójcik'],
      status: 'success',
      progress: 50,
      deadline: '10.03.2026',
      category: 'Praca inżynierska',
    }
  ];
}
