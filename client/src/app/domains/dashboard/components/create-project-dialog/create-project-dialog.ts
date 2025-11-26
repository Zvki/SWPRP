import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/services/api/auth.service';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProjectService} from '../../../../core/services/api/project.service';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../../core/services/api/user.service';
import {UserRole} from '../../../../core/interfaces/user-response';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';
import {ProjectRequest} from '../../../../core/interfaces/project/project-request.interface';

@Component({
  selector: 'app-create-project-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ButtonDirective
  ],
  templateUrl: './create-project-dialog.html',
  styleUrl: './create-project-dialog.css',
})
export class CreateProjectDialog implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly projectService = inject(ProjectService);
  private readonly userService = inject(UserService);

  protected supervisors = this.userService.supervisors;
  protected readonly dialogRef = inject(MatDialogRef<CreateProjectDialog>);
  protected readonly user = inject(AuthService).user;
  protected projectForm = this.initForm();

  public ngOnInit(): void {
    this.userService.getSupervisors();

    if (this.user()?.role !== UserRole.SUPERVISOR) {
      this.projectForm.addControl('supervisorId', new FormControl('', Validators.required));
    }
  }

  protected onSubmit(): void {
    if(this.projectForm.invalid) return;

    const data: ProjectRequest = {
      ...this.projectForm.value,
    }

    this.projectService.createProject(data).subscribe({
      next: () => this.dialogRef.close()
    })
  }

  private initForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
    });
  }

  protected readonly UserRole = UserRole;
}
