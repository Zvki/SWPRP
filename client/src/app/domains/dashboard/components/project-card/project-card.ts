import {Component, Input} from '@angular/core';
import {Project} from '../../dashboard';
import {NgClass} from '@angular/common';
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';

@Component({
  selector: 'app-project-card',
  imports: [
    NgClass,
    ButtonDirective
  ],
  templateUrl: './project-card.html',
  standalone: true,
  styleUrl: './project-card.css'
})
export class ProjectCard {
  @Input() project!: Project;

  getStatusClasses(status: 'W toku' | 'Zakończony' | 'Zagrożony'): Record<string, boolean> {
    return {
      'bg-blue-100 text-blue-800': status === 'W toku',
      'bg-green-100 text-green-800': status === 'Zakończony',
      'bg-red-100 text-red-800': status === 'Zagrożony',
    };
  }
}
