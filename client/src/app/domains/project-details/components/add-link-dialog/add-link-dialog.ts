import {Component, inject} from '@angular/core';
import {ButtonDirective} from "../../../../shared/ui/button/button-directive";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ProjectService} from '../../../../core/services/api/project.service';

@Component({
  selector: 'app-add-link-dialog',
  imports: [
    ButtonDirective,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-link-dialog.html',
  styleUrl: './add-link-dialog.css',
})
export class AddLinkDialog {
  private readonly projectService = inject(ProjectService);
  private readonly dialogRef = inject(MatDialogRef<AddLinkDialog>);
  private readonly fb = inject(FormBuilder);

  protected linkFormControl = this.fb.nonNullable.control('', [Validators.required]);

  protected onCancelClick(): void {
    this.dialogRef.close();
  }

  protected onSubmit(): void {
    if (this.linkFormControl.invalid) return;

    this.projectService.addLink(this.linkFormControl.value)
  }
}
