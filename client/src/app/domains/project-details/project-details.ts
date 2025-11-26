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
import {ButtonDirective} from '../../shared/ui/button/button-directive';
import {MatDialog} from '@angular/material/dialog';
import {AddMemberDialog} from './components/add-member-dialog/add-member-dialog';
import {MembershipStatus} from '../../core/interfaces/project/project-member';

@Component({
  imports: [
    NgClass,
    Activities,
    MatTabsModule,
    ButtonDirective
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
  private readonly dialog = inject(MatDialog);
  protected commentsTree= this.activityService.activityTree;
  protected filesTree = this.activityService.filesTree;
  protected meetingsTree = this.activityService.meetingTree;
  protected projectId!: string;
  protected project!: ProjectResponse;

  public ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.projectService.getProject(this.projectId)
      .subscribe(project => {
        this.project = project;
      });

    this.activityService.refreshActivities(this.projectId)
  }

  protected toggleAddMemberDialog(): void {
    this.dialog.open(AddMemberDialog, {
      maxWidth: '100%',
      width: '30%',
    })
  }

  protected readonly ProjectStatusLabel = ProjectStatusLabel;
  protected readonly ProjectStatusStyling = ProjectStatusStyling;
  protected readonly MembershipStatus = MembershipStatus;
}
