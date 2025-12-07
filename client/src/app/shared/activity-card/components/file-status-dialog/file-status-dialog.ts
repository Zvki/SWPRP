import {Component, inject} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {FileStatus, FileStatusLabel} from '../../../../core/interfaces/activity/activity.interface';
import {ActivityService} from '../../../../core/services/api/activity.service';
import {ActivityNodeInterface} from '../../../../core/interfaces/activity/activity-node.interface';
import {FileStatusRequest} from '../../../../core/interfaces/activity/file-status-request.interface';

@Component({
  selector: 'app-file-status-dialog',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './file-status-dialog.html',
  styleUrl: './file-status-dialog.css',
})
export class FileStatusDialog {

  private readonly activityService = inject(ActivityService);
  private readonly dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA) as { node: ActivityNodeInterface };

  protected readonly FileStatusLabel = FileStatusLabel;
  protected readonly FileStatus = FileStatus;

  protected toggleUpdate(newStatus: FileStatus): void {
    const data: FileStatusRequest = {
      activityId: this.data.node.activityId,
      status: newStatus
    }

    this.activityService.updateFileStatus(data).subscribe({
      next: () => this.dialogRef.close()
    })
  }
}
