import {Component, inject, Input} from '@angular/core';
import {ButtonDirective} from '../ui/button/button-directive';
import {DatePipe, NgClass} from '@angular/common';
import {ActivityType, FileStatusLabel, FileStatusStyling} from '../../core/interfaces/activity/activity.interface';
import {ActivityNodeInterface} from '../../core/interfaces/activity/activity-node.interface';
import {ResourceService} from '../../core/services/api/resource.service';
import {MatDialog} from '@angular/material/dialog';
import {FileStatusDialog} from './components/file-status-dialog/file-status-dialog';
import {UserRole} from '../../core/interfaces/user-response';
import {AuthService} from '../../core/services/api/auth.service';
import {ActivityService} from '../../core/services/api/activity.service';
import {MeetingNoteDialog} from './components/meeting-note-dialog/meeting-note-dialog';

@Component({
  selector: 'app-activity-card',
  imports: [
    ButtonDirective,
    DatePipe,
    NgClass
  ],
  templateUrl: './activity-card.html',
  styleUrl: './activity-card.css',
})
export class ActivityCard {
  @Input({required: true})
  public node!: ActivityNodeInterface;

  private readonly resourceService = inject(ResourceService);
  private readonly activityService = inject(ActivityService);
  private readonly dialog = inject(MatDialog);
  protected readonly user = inject(AuthService).user;
  protected readonly ActivityType = ActivityType;
  protected readonly FileStatusStyling = FileStatusStyling;
  protected readonly FileStatusLabel = FileStatusLabel;
  protected readonly UserRole = UserRole;

  protected onViewClick(fileUrl: string): void {
    this.resourceService.getFile(fileUrl)
      .subscribe({
        next: (blobData: Blob) => {
          const url = window.URL.createObjectURL(blobData);
          window.open(url, '_blank');
        },
        error: (err) => {
          console.error('Błąd podglądu pliku:', err);
        }
      });
  }

  protected toggleEditDialog(): void {
    this.dialog.open(FileStatusDialog, {
      data: { node: this.node },
    })
  }

  protected toggleMeetingNoteDialog(): void {
    this.dialog.open(MeetingNoteDialog, {
      data: { node: this.node},
      maxWidth: '100%',
      width: '40%',
      }
    )
  }

  protected toggleDelete(): void {
    this.activityService.deleteActivity(this.node.activityId)
  }


}
