import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ActivityService } from '../../../../core/services/api/activity.service';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';

interface DialogData {
  projectId: string;
}

interface MeetingRequest {
  projectId: string;
  title: string;
  url: string;
  dateTime: Date;
  description: string;
}

@Component({
  selector: 'app-meeting-dialog',
  imports: [
    MatDialogModule,
    FormsModule,
    ButtonDirective
  ],
  templateUrl: './meeting-dialog.html',
  styleUrl: './meeting-dialog.css',
})
export class MeetingDialog {
  private readonly dialogRef = inject(MatDialogRef<MeetingDialog>);
  private readonly activityService = inject(ActivityService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  title: string = '';
  meetingDate: string = new Date().toISOString().substring(0, 10);
  meetingTime: string = '10:00';
  meetingUrl: string = 'https://meet.google.com/';
  description: string = '';

  loading: boolean = false;
  submitError: string | null = null;


  async onCreateMeeting(): Promise<void> {
    if (!this.title || !this.meetingDate || !this.meetingTime) {
      this.submitError = "Tytuł, data i godzina są wymagane.";
      return;
    }

    const dateTime = new Date(`${this.meetingDate}T${this.meetingTime}:00`);

    const requestData: MeetingRequest = {
      projectId: this.data.projectId,
      title: this.title,
      url: this.meetingUrl,
      dateTime: dateTime,
      description: this.description
    };

    this.loading = true;
    this.submitError = null;

    try {
      this.dialogRef.close('created');
    } catch (error) {
      this.submitError = "Nie udało się utworzyć spotkania. Spróbuj ponownie.";
      console.error(error);
      this.loading = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
