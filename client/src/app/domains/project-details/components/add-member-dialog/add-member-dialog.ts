import {Component, Inject, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';
import {MembershipRequest} from '../../../../core/interfaces/project/membership-request.interface';
import {ProjectService} from '../../../../core/services/api/project.service';

@Component({
  selector: 'app-add-member-dialog',
  imports: [
    ButtonDirective,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-member-dialog.html',
  styleUrl: './add-member-dialog.css',
})
export class AddMemberDialog {

  private readonly projectService = inject(ProjectService);
  private readonly dialogRef = inject(MatDialogRef<AddMemberDialog>);
  private readonly fb = inject(FormBuilder);

  constructor(@Inject(MAT_DIALOG_DATA) public data: {projectId: string}) { }

  protected emailFormControl = this.fb.nonNullable.control('', [Validators.required, Validators.email]);

  protected onCancelClick(): void {
    this.dialogRef.close();
  }

  protected onSubmit(): void {
    if(this.emailFormControl.invalid) return;

    const data: MembershipRequest = {
      email: this.emailFormControl.value,
      projectId: this.data.projectId
    }

    this.projectService.addMember(data)

  }

}
