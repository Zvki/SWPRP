import {Component, inject, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ActivityService} from '../../../../core/services/api/activity.service';
import {CommonModule} from '@angular/common';
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';
import {FileRequest} from '../../../../core/interfaces/activity/file-request.interface';

interface DialogData {
  projectId: string;
}

export interface FileForm {
  file: FormControl<File | null>;
  content: FormControl<string | null>;
}


@Component({
  selector: 'app-comment-response',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    ButtonDirective,
    ReactiveFormsModule
  ],
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.css',
})
export class FileUploadDialogComponent {

  private readonly dialogRef = inject(MatDialogRef<FileUploadDialogComponent>);
  private readonly activityService = inject(ActivityService);
  private readonly fb = inject(FormBuilder);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  protected readonly fileForm = this.initFileForm();
  protected isLoading = false;

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileForm.get('file')?.setValue(input.files[0]);
    } else {
      this.fileForm.get('file')?.setValue(null);
    }
  }

  protected onUpload(): void {
    if (this.fileForm.invalid) return;
    const formValue = this.fileForm.value;
    const data: FileRequest = {
      projectId: this.data.projectId,
      ...formValue,
    }
    this.isLoading = true;
    this.activityService.addFile(data).subscribe({
      next: () => {
        this.dialogRef.close()
        this.isLoading = false;
      },
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private initFileForm(): FormGroup {
    return this.fb.group<FileForm>({
      file: new FormControl(null, { validators: Validators.required}),
      content: new FormControl('')
    })
  }

  protected get file(): File {
    return this.fileForm.get('file')?.value;
  }
}
