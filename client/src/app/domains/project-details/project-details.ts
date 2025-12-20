import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../core/services/api/project.service';
import {
  ProjectResponse, ProjectStatus,
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
import {AuthService} from '../../core/services/api/auth.service';
import {StatusRequest} from '../../core/interfaces/project/status-request.interface';
import {UserRole} from '../../core/interfaces/user-response';
import {AddLinkDialog} from './components/add-link-dialog/add-link-dialog';
import {ResourceService} from '../../core/services/api/resource.service';

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
  protected readonly resourceService = inject(ResourceService);
  private readonly dialog = inject(MatDialog);
  protected commentsTree= this.activityService.activityTree;
  protected filesTree = this.activityService.filesTree;
  protected meetingsTree = this.activityService.meetingTree;
  protected user = inject(AuthService).user;
  protected projectId!: string;
  protected project = this.projectService.project;

  public ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.projectService.getProject(this.projectId)
    this.activityService.refreshActivities(this.projectId);
  }

  protected finishProject(id: string): void {
    const data: StatusRequest = {
      id: id,
      status: ProjectStatus.FINISHED
    }
    this.projectService.changeStatus(data).subscribe({
      next: () => this.projectService.getProject(this.projectId)
    });
  }

  protected changeStatus(id: string): void {
    const data: StatusRequest = {
      id: id,
      status: ProjectStatus.ACTIVE
    }
    this.projectService.changeStatus(data).subscribe({
      next: () => this.projectService.getProject(this.projectId)
    });
  }

  protected toggleAddMemberDialog(): void {
    this.dialog.open(AddMemberDialog, {
      data: { projectId: this.projectId },
      maxWidth: '100%',
      width: '30%',
    })
  }

  protected toggleAddLinkDialog(): void {
    this.dialog.open(AddLinkDialog, {
      maxWidth: '100%',
      width: '30%',
    })
  }

  protected generateReport(id: string): void {
    this.resourceService.getReport(id);
  }

  protected readonly ProjectStatusLabel = ProjectStatusLabel;
  protected readonly ProjectStatusStyling = ProjectStatusStyling;
  protected readonly MembershipStatus = MembershipStatus;
  protected readonly ProjectStatus = ProjectStatus;
  protected readonly UserRole = UserRole;
}
