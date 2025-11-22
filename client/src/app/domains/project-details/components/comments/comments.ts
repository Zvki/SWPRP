import {Component, inject, Input, Signal} from '@angular/core';
import {ActivityNode} from '../../../../core/interfaces/activity/comment-node.interface';
import {DatePipe, NgTemplateOutlet} from '@angular/common';
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';
import {CommentResponse} from '../comment-response/comment-response';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-comments',
  imports: [
    DatePipe,
    NgTemplateOutlet,
    ButtonDirective
  ],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments {
  @Input()
  public commentsTree!: Signal<ActivityNode[]>;

  private readonly dialog = inject(MatDialog);

  trackById = (i: number, item: ActivityNode) => item.id;

  openReplyDialog(comment: ActivityNode) {
    this.dialog.open(CommentResponse, {
      width: '500px',
      data: comment
    });
  }
}
