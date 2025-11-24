import {Component, inject, Inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ActivityService} from '../../../../core/services/api/activity.service';
import {CommonModule} from '@angular/common';
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';

interface DialogData {
  projectId: string;
}


@Component({
  selector: 'app-comment-response',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    ButtonDirective
  ],
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.css',
})
export class FileUploadDialogComponent {

  private readonly dialogRef = inject(MatDialogRef<FileUploadDialogComponent>);
  private readonly activityService = inject(ActivityService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  selectedFile: File | null = null;
  fileComment: string = '';
  uploading: boolean = false;
  uploadProgress: number = 0;
  uploadError: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
    this.uploadError = null;
  }

  async onUpload(): Promise<void> {
    if (!this.selectedFile) {
      this.uploadError = "Proszę wybrać plik.";
      return;
    }

    this.uploading = true;
    this.uploadError = null;

    try {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('projectId', this.data.projectId);
      formData.append('content', this.fileComment);

      // await this.activityService.uploadFile(formData, (progress: number) => {
      //   this.uploadProgress = progress;
      // });

      this.dialogRef.close('uploaded');

    } catch (error) {
      this.uploadError = "Błąd podczas wgrywania pliku. Spróbuj ponownie.";
      console.error(error);
      this.uploading = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
