import {
  Component, inject, OnInit, ChangeDetectionStrategy, signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ReusableInputComponent } from '../../shared/components/reusable-input/reusable-input.component';
import { ReusableSelectComponent } from '../../shared/components/reusable-select/reusable-select.component';
import { ReusableAutocompleteComponent } from '../../shared/components/reusable-autocomplete/reusable-autocomplete.component';
import { ReusableCheckboxComponent } from '../../shared/components/reusable-checkbox/reusable-checkbox.component';
import { ReusableRadioComponent } from '../../shared/components/reusable-radio/reusable-radio.component';
import { ReusableSliderComponent } from '../../shared/components/reusable-slider/reusable-slider.component';
import { ReusableDatepickerComponent } from '../../shared/components/reusable-datepicker/reusable-datepicker.component';
import { ReusableChipsComponent } from '../../shared/components/reusable-chips/reusable-chips.component';
import { ReusableFileUploadComponent } from '../../shared/components/reusable-file-upload/reusable-file-upload.component';
import { ReusableButtonComponent } from '../../shared/components/reusable-button/reusable-button.component';
import { NotificationService } from '../../core/services/notification.service';
import { SelectOption } from '../../shared/models/form.model';
import { DEPARTMENTS } from '../../core/models/employee.model';
import { DOCTORS, SPECIALITIES } from '../../core/models/patient.model';

@Component({
  selector: 'app-forms-showcase',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatTabsModule, MatIconModule, MatButtonModule,
    MatDividerModule, MatSlideToggleModule, MatExpansionModule, MatChipsModule,
    PageHeaderComponent,
    ReusableInputComponent, ReusableSelectComponent, ReusableAutocompleteComponent,
    ReusableCheckboxComponent, ReusableRadioComponent, ReusableSliderComponent,
    ReusableDatepickerComponent, ReusableChipsComponent, ReusableFileUploadComponent,
    ReusableButtonComponent,
  ],
  templateUrl: './forms-showcase.component.html',
  styleUrl: './forms-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsShowcaseComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly notification = inject(NotificationService);

  readonly activeComponent = signal('input');
  readonly submitting = signal(false);
  readonly submitted = signal(false);

  form!: FormGroup;

  readonly departmentOptions: SelectOption[] = DEPARTMENTS.map((d) => ({
    label: d.name, value: d.id,
  }));

  readonly specialityOptions: SelectOption[] = SPECIALITIES.map((s) => ({
    label: s.name, value: s.id, icon: s.icon,
  }));

  readonly doctorOptions: SelectOption[] = DOCTORS.map((d) => ({
    label: d.doctorName, value: d.doctorId, description: d.specialityName,
  }));

  readonly genderOptions: SelectOption[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  readonly skillSuggestions = [
    'Angular', 'React', 'Vue', 'TypeScript', 'JavaScript',
    'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'Kubernetes',
  ];

  ngOnInit(): void {
    const comp = this.route.snapshot.data['component'];
    if (comp) this.activeComponent.set(comp);

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      department: [null, Validators.required],
      speciality: [null, Validators.required],
      doctor: [null],
      gender: ['male'],
      agree: [false, Validators.requiredTrue],
      rating: [50],
      joinDate: [null],
      skills: [[]],
      documents: [[]],
      notifications: [true],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notification.error('Please fix form errors before submitting.');
      return;
    }
    this.submitting.set(true);
    setTimeout(() => {
      this.submitting.set(false);
      this.submitted.set(true);
      this.notification.success('Form submitted successfully!');
    }, 1500);
  }

  resetForm(): void {
    this.form.reset({ gender: 'male', rating: 50, notifications: true });
    this.submitted.set(false);
  }

  setActiveComponent(id: string): void {
    this.activeComponent.set(id);
  }

  get nameControl() { return this.form.get('name'); }
  get emailControl() { return this.form.get('email'); }
  get phoneControl() { return this.form.get('phone'); }
  get passwordControl() { return this.form.get('password'); }
  get deptControl() { return this.form.get('department'); }
  get specialityControl() { return this.form.get('speciality'); }
  get doctorControl() { return this.form.get('doctor'); }
  get genderControl() { return this.form.get('gender'); }
  get agreeControl() { return this.form.get('agree'); }
  get ratingControl() { return this.form.get('rating'); }
  get joinDateControl() { return this.form.get('joinDate'); }
  get skillsControl() { return this.form.get('skills'); }
  get docsControl() { return this.form.get('documents'); }

  readonly maxBirthDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18));

  readonly multiOptions: SelectOption[] = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Node.js', value: 'node' },
    { label: 'Python', value: 'python' },
  ];

  readonly formComponents = [
    { id: 'input', label: 'Input', icon: 'text_fields', description: 'Text input with validation' },
    { id: 'select', label: 'Select', icon: 'arrow_drop_down_circle', description: 'Dropdown selection' },
    { id: 'autocomplete', label: 'Autocomplete', icon: 'search', description: 'Type-ahead search' },
    { id: 'checkbox', label: 'Checkbox', icon: 'check_box', description: 'Boolean selection' },
    { id: 'radio', label: 'Radio', icon: 'radio_button_checked', description: 'Single choice' },
    { id: 'toggle', label: 'Toggle', icon: 'toggle_on', description: 'Slide toggle' },
    { id: 'slider', label: 'Slider', icon: 'tune', description: 'Range slider' },
    { id: 'datepicker', label: 'Datepicker', icon: 'date_range', description: 'Date selection' },
    { id: 'chips', label: 'Chips', icon: 'label', description: 'Tag input' },
    { id: 'file-upload', label: 'File Upload', icon: 'upload_file', description: 'File & drag drop' },
  ];

  get currentComp() {
    return this.formComponents.find((c) => c.id === this.activeComponent());
  }
}
