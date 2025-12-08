import {Component, Inject, inject} from '@angular/core';
import {ButtonDirective} from "../../../ui/button/button-directive";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from '@angular/material/input';
import {ActivityService} from '../../../../core/services/api/activity.service';
import {ActivityNodeInterface} from '../../../../core/interfaces/activity/activity-node.interface';
import {MeetingNoteRequest} from '../../../../core/interfaces/activity/meeting-note-request.interface';
import {AuthService} from '../../../../core/services/api/auth.service';
import {UserRole} from '../../../../core/interfaces/user-response';

@Component({
  selector: 'app-meeting-note-dialog',
    imports: [
        ButtonDirective,
        FormsModule,
        MatDialogActions,
        MatDialogModule,
        MatInputModule,
        ReactiveFormsModule
    ],
  templateUrl: './meeting-note-dialog.html',
  styleUrl: './meeting-note-dialog.css',
})
export class MeetingNoteDialog {
  private readonly dialogRef = inject(MatDialogRef<MeetingNoteDialog>);
  private readonly activityService = inject(ActivityService);
  private readonly fb = inject(FormBuilder);
  protected readonly user = inject(AuthService).user;
  public data = inject(MAT_DIALOG_DATA) as { node: ActivityNodeInterface };

  constructor() {
    this.noteFormControl.setValue(this.data.node.meeting?.note || '');
  }

  protected noteFormControl = this.fb.nonNullable.control('' );


  protected onCancelClick(): void {
    this.dialogRef.close();
  }

  protected onSubmit(): void {
    const data: MeetingNoteRequest = {
      note: this.noteFormControl.value,
      activityId: this.data.node.activityId,
    }

    this.activityService.addMeetingNote(data).subscribe({
      next: () => this.dialogRef.close()
    })
  }

  protected readonly UserRole = UserRole;
}
