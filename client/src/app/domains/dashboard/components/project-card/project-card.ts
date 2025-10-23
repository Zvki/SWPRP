import {Component, Input} from '@angular/core';
import {Project} from '../../dashboard';
import {NgClass} from '@angular/common';
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';
import {StatusLabel, StatusStyling} from '../../const/status';

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
  protected readonly StatusStyling = StatusStyling;
  protected readonly StatusLabel = StatusLabel;
}
