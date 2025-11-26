import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';

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


  private readonly dialogRef = inject(MatDialogRef<AddMemberDialog>);
  private readonly fb = inject(FormBuilder);

  protected emailFormControl = this.fb.control('', [Validators.required, Validators.email]);

  protected onCancelClick(): void {
    this.dialogRef.close();
  }

  protected onSubmit(): void {
    console.log(this.emailFormControl.value);
  }

}
