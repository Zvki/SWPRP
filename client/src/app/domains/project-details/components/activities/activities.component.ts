import {AfterViewInit, Component, inject, Input, Signal} from '@angular/core';
import {ActivityNodeInterface} from '../../../../core/interfaces/activity/activity-node.interface';
import {FormsModule} from '@angular/forms';
import {ActivityTree} from '../activity-tree/activity-tree';
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';
import {CommentRequest} from '../../../../core/interfaces/activity/comment-request.interface';
import {ActivityService} from '../../../../core/services/api/activity.service';
import {FileUploadDialogComponent} from '../file-upload-dialog/file-upload-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MeetingDialog} from '../meeting-dialog/meeting-dialog';

@Component({
  selector: 'app-activities',
  imports: [
    FormsModule,
    ActivityTree,
    ButtonDirective
  ],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css',
})
export class Activities implements AfterViewInit{

  private readonly activityService = inject(ActivityService);
  private readonly dialog = inject(MatDialog);

  @Input()
  public commentsTree!: Signal<ActivityNodeInterface[]>;

  @Input()
  public projectId!: string;

  protected rootCommentContent: string = '';

  ngAfterViewInit(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  protected sendRootComment(): void {
    if (!this.rootCommentContent || this.rootCommentContent.trim().length === 0) return;
    const data: CommentRequest = {
      content: this.rootCommentContent,
      projectId: this.projectId
    }
    this.activityService.addComment(data);
    this.rootCommentContent = '';
  }

  protected openFileUploadDialog() {
    this.dialog.open(FileUploadDialogComponent, {
      data: { projectId: this.projectId },
      width: '500px'
    })
  }

  openMeetingDialog() {
    this.dialog.open(MeetingDialog, {
      data: {
        projectId: this.projectId
      },
      width: '550px',
      disableClose: true
    })
  }
}
