import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ActivityService} from '../../../../core/services/api/activity.service';
import {
  FormBuilder, FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'; // Nowy import
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';
import {MatInputModule} from '@angular/material/input'; // Nowy import
import {MatDatepickerModule} from '@angular/material/datepicker'; // Nowy import
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core'; // Wymagany dla Datepicker
import {MatTimepickerModule} from '@angular/material/timepicker';
import {MeetingRequest} from '../../../../core/interfaces/activity/meeting-request.interface'; // Do formatowania daty przed wysłaniem

interface DialogData {
  projectId: string;
}

export interface MeetingData {
  title: FormControl<string>;
  url: FormControl<string>;
  meetingDate: FormControl<Date>;
  content: FormControl<string | null>;
}

@Component({
  selector: 'app-meeting-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    ButtonDirective,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTimepickerModule,
    MatDatepickerModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './meeting-dialog.html',
  styleUrl: './meeting-dialog.css',
})
export class MeetingDialog {
  private readonly dialogRef = inject(MatDialogRef<MeetingDialog>);
  private readonly activityService = inject(ActivityService);
  private readonly fb = inject(FormBuilder);

  protected meetingForm: FormGroup = this.initMeetingForm();
  protected isLoading = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  onCreateMeeting(): void {
    this.isLoading = true;
    if (this.meetingForm.invalid) return;
    const formValue = this.meetingForm.value;
    const data: MeetingRequest = {
      projectId: this.data.projectId,
        ...formValue,
    }
    this.activityService.addMeeting(data).subscribe({
      next: () => {
        this.dialogRef.close()
        this.isLoading = false;
      },
    })
  }

  protected onCancel(): void {
    this.dialogRef.close();
  }

  private initMeetingForm(): FormGroup {
    return this.fb.group<MeetingData>({
      title: new FormControl('', { nonNullable: true, validators: Validators.required}),
      meetingDate: new FormControl(new Date(), { nonNullable: true, validators: Validators.required}),
      url: new FormControl('', { nonNullable: true, validators: Validators.required}),
      content: new FormControl('')
    });
  }
}
