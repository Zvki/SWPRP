import {Component, inject, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';
import {
  ProjectResponse, ProjectStatus,
  ProjectStatusLabel,
  ProjectStatusStyling
} from '../../../../core/interfaces/project/project-response';
import {Router} from '@angular/router';
import {ProjectService} from '../../../../core/services/api/project.service';
import {AuthService} from '../../../../core/services/api/auth.service';
import {UserRole} from '../../../../core/interfaces/user-response';

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
  private readonly projectService = inject(ProjectService);

  protected readonly user = inject(AuthService).user;
  @Input() project!: ProjectResponse;

  protected goToDetails(project: ProjectResponse): void {
    this.router.navigate(['/project', project.id]);
  }

  protected changeStatus(id: string): void {
    this.projectService.changeStatus(id);
  }

  protected readonly StatusStyling = ProjectStatusStyling;
  protected readonly StatusLabel = ProjectStatusLabel;
  protected readonly UserRole = UserRole;
  protected readonly ProjectStatus = ProjectStatus;
}
