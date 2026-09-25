import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ReusableTableComponent } from '../../../shared/components/reusable-table/reusable-table.component';
import { ReusableButtonComponent } from '../../../shared/components/reusable-button/reusable-button.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { PatientService } from '../../../core/services/patient.service';
import { NotificationService } from '../../../core/services/notification.service';
import { DialogService } from '../../../core/services/dialog.service';
import { Patient, PATIENT_STATUS_COLORS } from '../../../core/models/patient.model';
import { TableColumn, TableAction, ActionEvent } from '../../../shared/models/table.model';
import { StatCard } from '../../../shared/models/card.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule, MatCardModule,
    PageHeaderComponent, ReusableTableComponent, ReusableButtonComponent, StatCardComponent,
  ],
  templateUrl: './patient-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientListComponent implements OnInit {
  private readonly patientService = inject(PatientService);
  readonly notification = inject(NotificationService);
  private readonly dialogService = inject(DialogService);

  readonly loading = signal(true);
  readonly patients = signal<Patient[]>([]);

  get statCards(): StatCard[] {
    const all = this.patients();
    return [
      { id: 'total', title: 'Total Patients', value: all.length, icon: 'people', iconBg: '#1976d2', iconColor: '#fff' },
      { id: 'active', title: 'Active', value: all.filter(p => p.status === 'active').length, icon: 'personal_injury', iconBg: '#4caf50', iconColor: '#fff' },
      { id: 'critical', title: 'Critical', value: all.filter(p => p.status === 'critical').length, icon: 'emergency', iconBg: '#f44336', iconColor: '#fff' },
      { id: 'discharged', title: 'Discharged', value: all.filter(p => p.status === 'discharged').length, icon: 'logout', iconBg: '#9c27b0', iconColor: '#fff' },
    ];
  }

  readonly columns: TableColumn<Patient>[] = [
    { key: 'patientId', header: 'Patient ID', width: '100px' },
    { key: 'firstName', header: 'Name', sortable: true, format: (_, r) => `${r.firstName} ${r.lastName}` },
    { key: 'age', header: 'Age', align: 'center', sortable: true },
    { key: 'bloodGroup', header: 'Blood Group', align: 'center' },
    { key: 'phone', header: 'Phone' },
    { key: 'doctorName', header: 'Doctor', sortable: true },
    { key: 'specialityName', header: 'Speciality', sortable: true },
    { key: 'diagnosis', header: 'Diagnosis' },
    { key: 'admissionDate', header: 'Admitted', type: 'date', sortable: true },
    { key: 'status', header: 'Status', type: 'badge', badgeConfig: { colorMap: PATIENT_STATUS_COLORS } },
  ];

  readonly actions: TableAction<Patient>[] = [
    { id: 'view', label: 'View', icon: 'visibility', color: 'primary' },
    { id: 'prescribe', label: 'Prescribe', icon: 'medication' },
    { id: 'discharge', label: 'Discharge', icon: 'logout', visible: (row) => row.status === 'active' || row.status === 'critical' },
  ];

  ngOnInit(): void {
    this.patientService.getAll().subscribe((data) => {
      this.patients.set(data);
      this.loading.set(false);
    });
  }

  onAction(event: ActionEvent<Patient>): void {
    if (event.actionId === 'discharge') {
      this.dialogService.confirm({
        title: 'Discharge Patient',
        message: `Discharge ${event.row.firstName} ${event.row.lastName}?`,
        type: 'warning', confirmText: 'Discharge',
      }).subscribe((ok) => {
        if (ok) {
          this.patientService.update(event.row.id, { status: 'discharged' }).subscribe(() => {
            this.patients.update((list) => list.map((p) => p.id === event.row.id ? { ...p, status: 'discharged' } : p));
            this.notification.success('Patient discharged.');
          });
        }
      });
    } else {
      this.notification.info(`${event.actionId} — ${event.row.firstName} ${event.row.lastName}`);
    }
  }
}
