import {Component, inject} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {ButtonDirective} from '../../../shared/ui/button/button-directive';
import {AuthService} from '../../../core/services/api/auth.service';

@Component({
  selector: 'app-signin-dialog',
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    ButtonDirective,
    ReactiveFormsModule,
    MatInput
  ],
  templateUrl: './signin-dialog.html',
  standalone: true,
  styleUrl: './signin-dialog.css'
})
export class SigninDialog {

  private fb = inject(FormBuilder)
  private auth = inject(AuthService)

  public loginFormControl = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  })
  public dialogRef = inject(MatDialogRef<SigninDialog>)

  protected onCancelClick(): void {
    this.dialogRef.close();
  }

  protected onSubmit(): void {

    if (this.loginFormControl.valid) {
      this.auth.login(this.loginFormControl.getRawValue()).subscribe(
        success => {
          if(success) {
            this.dialogRef.close()
          } else {
            console.log("Nieprawidłowe dane logowania")
          }
        }
      )
    }
  }
}
