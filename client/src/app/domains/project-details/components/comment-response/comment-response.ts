import {Component, inject, Inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ActivityNode} from '../../../../core/interfaces/activity/comment-node.interface';
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';

@Component({
  selector: 'app-comment-response',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonDirective
  ],
  templateUrl: './comment-response.html',
  styleUrl: './comment-response.css',
})
export class CommentResponse {

  private readonly fb = inject(FormBuilder);
  readonly data = inject<ActivityNode>(MAT_DIALOG_DATA);

  private readonly dialogRef = inject(MatDialogRef<CommentResponse>);

  protected form = this.fb.group({
    content: ['', Validators.required]
  });

  submit() {
    if (this.form.invalid) return;

    this.dialogRef.close({
      parentReferenceId: this.data.id,
      content: this.form.value.content
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
