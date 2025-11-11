import {Component, inject, OnInit} from '@angular/core';
import {ProjectCard} from './components/project-card/project-card';
import {ButtonDirective} from '../../shared/ui/button/button-directive';
import {ProjectService} from '../../core/services/api/project.service';
import {MatDialog} from '@angular/material/dialog';
import {ProjectCreationDialog} from './components/project-creation-dialog/project-creation-dialog';

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
export class Dashboard implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly dialog = inject(MatDialog);

  protected toggleCreationDialog(): void {
    const dialogRef = this.dialog.open(ProjectCreationDialog)
  }

  protected projectsStore = this.projectService.getProjectsStore;

  public ngOnInit(): void {
    this.projectService.getProjects();
  }
}
