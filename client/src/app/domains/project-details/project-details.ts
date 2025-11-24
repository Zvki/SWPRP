import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../core/services/api/project.service';
import {
  ProjectResponse,
  ProjectStatusLabel,
  ProjectStatusStyling
} from '../../core/interfaces/project/project-response';
import {NgClass} from '@angular/common';
import {ActivityService} from '../../core/services/api/activity.service';
import {Activities} from './components/activities/activities.component';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  imports: [
    NgClass,
    Activities,
    MatTabsModule
  ],
  selector: 'app-project-details',
  standalone: true,
  styleUrl: './project-details.css',
  templateUrl: './project-details.html'
})
export class ProjectDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly activityService = inject(ActivityService);
  protected commentsTree= this.activityService.activityTree;
  protected filesTree = this.activityService.filesTree;
  protected projectId!: string;
  protected project!: ProjectResponse;

  public ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.projectService.getProject(this.projectId)
      .subscribe(project => {
        console.log(project);
        this.project = project;
      });

    this.activityService.loadActivities(this.projectId);
    this.activityService.loadFiles(this.projectId);
  }

  protected readonly ProjectStatusLabel = ProjectStatusLabel;
  protected readonly ProjectStatusStyling = ProjectStatusStyling;
}
