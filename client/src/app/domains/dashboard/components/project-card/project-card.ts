import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';
import {
  ProjectResponse,
  ProjectStatusLabel,
  ProjectStatusStyling
} from '../../../../core/interfaces/project/project-response';

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
  @Input() project!: ProjectResponse;
  protected readonly StatusStyling = ProjectStatusStyling;
  protected readonly StatusLabel = ProjectStatusLabel;
}
