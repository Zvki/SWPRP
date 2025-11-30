import {Component, inject, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';
import {CommentRequest} from '../../../../core/interfaces/activity/comment-request.interface';
import {ActivityNodeInterface} from '../../../../core/interfaces/activity/activity-node.interface';
import {ActivityService} from '../../../../core/services/api/activity.service';
import {DatePipe} from '@angular/common';
import {ActivityType} from '../../../../core/interfaces/activity/activity.interface';
import {ResourceService} from '../../../../core/services/api/resource.service';


@Component({
  selector: 'app-activity-node',
  imports: [
    FormsModule,
    ButtonDirective,
    DatePipe
  ],
  templateUrl: './activity-node.html',
  styleUrl: './activity-node.css',
})
export class ActivityNode {
  private readonly activityService = inject(ActivityService);
  private readonly resourceService = inject(ResourceService);

  @Input({ required: true })
  public node!: ActivityNodeInterface;

  @Input({ required: true })
  public projectId!: string;

  protected content: string = '';

  protected onSendReply() {
    if (!this.content || this.content.trim().length === 0) return;

    const data: CommentRequest = {
      content: this.content,
      projectId: this.projectId,
      parentId: this.node.id
    }

    this.activityService.addComment(data).subscribe({
      next: () => this.content = ''
    });
  }

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

  protected readonly ActivityType = ActivityType;
}
