import {Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {MatDialogContent} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {ButtonDirective} from '../../../../shared/ui/button/button-directive';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {map, Observable, startWith} from 'rxjs';
import {AsyncPipe} from '@angular/common';

const SUPERVISORS_DATA = [
  { id: '1', name: 'Dr hab. inż. Maciej Mackowski, prof. uczelni' },
  { id: '2', name: 'Dr inż. Jan Kowalski' },
  { id: '3', name: 'Prof. dr hab. Anna Nowak' },
  { id: '4', name: 'Dr inż. Piotr Wiśniewski' },
];

@Component({
  selector: 'app-project-creation-dialog',
  imports: [
    MatDialogContent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInput,
    MatSelectModule,
    ButtonDirective,
    FormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    AsyncPipe
  ],
  templateUrl: './project-creation-dialog.html',
  styleUrl: './project-creation-dialog.css',
})
export class ProjectCreationDialog implements OnInit {

  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  protected projectForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', []],
    supervisorId: ['', [Validators.required]],
    emailInvites: this.fb.array<FormControl<string>>([])
  });

  protected allSupervisors = SUPERVISORS_DATA;

  protected supervisorInputControl = new FormControl('');

  protected filteredSupervisors$!: Observable<{ id: string; name: string }[]>;

  public ngOnInit(): void {
    this.filteredSupervisors$ = this.supervisorInputControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterSupervisors(value || ''))
    );

    this.supervisorInputControl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(inputValue => {
      const supervisorExists = this.allSupervisors.some(s => s.name === inputValue);
      if (!supervisorExists && this.projectForm.get('supervisorId')?.value) {
        this.projectForm.get('supervisorId')?.setValue('');
        this.projectForm.get('supervisorId')?.markAsTouched();
      }
    });
  }

  private _filterSupervisors(value: string): { id: string; name: string }[] {
    const filterValue = value.toLowerCase();
    return this.allSupervisors.filter(supervisor =>
      supervisor.name.toLowerCase().includes(filterValue)
    );
  }

  protected onSupervisorSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedSupervisor: { id: string; name: string } = event.option.value;

    this.projectForm.get('supervisorId')?.setValue(selectedSupervisor.id);

    this.supervisorInputControl.setValue(selectedSupervisor.name, { emitEvent: false });

    this.projectForm.get('supervisorId')?.markAsTouched();
  }

  get emailInvites() {
    return this.projectForm.get('emailInvites') as FormArray;
  }

  protected addEmailInvite(): void {
    const emailControl = this.fb.control('', [Validators.required, Validators.email]);
    this.emailInvites.push(emailControl);
  }

  protected removeEmailInvite(index: number): void {
    this.emailInvites.removeAt(index);
  }

  protected onSubmit(): void {
    if (this.projectForm.valid) {
      console.log('Formularz wysłany:', this.projectForm.value);
      // Tutaj docelowo byłoby wywołanie serwisu API
      // np. this.projectService.create(this.projectForm.value).subscribe(...)
    } else {
      console.log('Formularz jest niepoprawny.');
      this.projectForm.markAllAsTouched();
    }
  }
}
