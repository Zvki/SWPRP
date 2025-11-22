import {Component, inject, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';
import {
  ProjectResponse,
  ProjectStatusLabel,
  ProjectStatusStyling
} from '../../../../core/interfaces/project/project-response';
import {Router} from '@angular/router';

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
  private readonly router = inject(Router);
  @Input() project!: ProjectResponse;

  protected goToDetails(project: ProjectResponse): void {
    this.router.navigate(['/project', project.id]);
  }
  protected readonly StatusStyling = ProjectStatusStyling;
  protected readonly StatusLabel = ProjectStatusLabel;
}
