import {Component, inject, OnInit} from '@angular/core';
import {ProjectCard} from './components/project-card/project-card';
import {ButtonDirective} from '../../shared/ui/button/button-directive';
import {ProjectService} from '../../core/services/api/project.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateProjectDialog} from './components/create-project-dialog/create-project-dialog';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {ScreenSizeService} from '../../core/services/screen-size.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    ProjectCard,
    ButtonDirective,
    MatTab,
    MatTabGroup
  ],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly isMobile = inject(ScreenSizeService).isMobile();
  private readonly dialog = inject(MatDialog);

  protected toggleCreationDialog(): void {
    this.dialog.open(CreateProjectDialog, {
      maxWidth: '100%',
      width: this.isMobile ? '90%' : '30%',
    })
  }

  protected projectsStore = this.projectService.projectsStore;

  public ngOnInit(): void {
    this.projectService.getProjects();
  }
}
