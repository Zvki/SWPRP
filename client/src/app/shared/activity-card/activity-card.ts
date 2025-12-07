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
  protected readonly user = inject(AuthService).user;
  private readonly dialog = inject(MatDialog);
  protected readonly ActivityType = ActivityType;

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

  protected readonly FileStatusStyling = FileStatusStyling;
  protected readonly FileStatusLabel = FileStatusLabel;
  protected readonly UserRole = UserRole;
}
