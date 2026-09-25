import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ReusableTableComponent } from '../../../shared/components/reusable-table/reusable-table.component';
import { ReusableButtonComponent } from '../../../shared/components/reusable-button/reusable-button.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { EmployeeService } from '../../../core/services/employee.service';
import { NotificationService } from '../../../core/services/notification.service';
import { DialogService } from '../../../core/services/dialog.service';
import { Employee, EMPLOYEE_STATUS_COLORS } from '../../../core/models/employee.model';
import { TableColumn, TableAction, ActionEvent } from '../../../shared/models/table.model';
import { StatCard } from '../../../shared/models/card.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, MatChipsModule,
    PageHeaderComponent, ReusableTableComponent, ReusableButtonComponent, StatCardComponent,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  readonly notification = inject(NotificationService);
  private readonly dialogService = inject(DialogService);

  readonly loading = signal(true);
  readonly employees = signal<Employee[]>([]);
  readonly selected = signal<Employee[]>([]);

  get statCards(): StatCard[] {
    const all = this.employees();
    return [
      { id: 'total', title: 'Total Employees', value: all.length, icon: 'people', iconBg: '#3949ab', iconColor: '#fff' },
      { id: 'active', title: 'Active', value: all.filter(e => e.status === 'active').length, icon: 'check_circle', iconBg: '#4caf50', iconColor: '#fff' },
      { id: 'onleave', title: 'On Leave', value: all.filter(e => e.status === 'on-leave').length, icon: 'event_busy', iconBg: '#ff9800', iconColor: '#fff' },
      { id: 'depts', title: 'Departments', value: new Set(all.map(e => e.departmentId)).size, icon: 'business', iconBg: '#9c27b0', iconColor: '#fff' },
    ];
  }

  readonly columns: TableColumn<Employee>[] = [
    { key: 'employeeId', header: 'Emp ID', width: '90px' },
    { key: 'firstName', header: 'Name', sortable: true, format: (_, r) => `${r.firstName} ${r.lastName}` },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'departmentName', header: 'Department', sortable: true },
    { key: 'designation', header: 'Designation', sortable: true },
    { key: 'salary', header: 'Salary', type: 'currency', sortable: true, align: 'right' },
    { key: 'joiningDate', header: 'Joined', type: 'date', sortable: true },
    { key: 'status', header: 'Status', type: 'badge', badgeConfig: { colorMap: EMPLOYEE_STATUS_COLORS } },
  ];

  readonly actions: TableAction<Employee>[] = [
    { id: 'view', label: 'View', icon: 'visibility', color: 'primary' },
    { id: 'edit', label: 'Edit', icon: 'edit' },
    { id: 'delete', label: 'Delete', icon: 'delete', color: 'warn' },
  ];

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((data) => {
      this.employees.set(data);
      this.loading.set(false);
    });
  }

  onAction(event: ActionEvent<Employee>): void {
    if (event.actionId === 'delete') {
      this.dialogService.confirm({
        title: 'Delete Employee',
        message: `Delete ${event.row.firstName} ${event.row.lastName}? This action cannot be undone.`,
        type: 'danger', confirmText: 'Delete',
      }).subscribe((ok) => {
        if (ok) {
          this.employeeService.delete(event.row.id).subscribe(() => {
            this.employees.update((list) => list.filter((e) => e.id !== event.row.id));
            this.notification.success('Employee deleted.');
          });
        }
      });
    } else {
      this.notification.info(`${event.actionId} — ${event.row.firstName} ${event.row.lastName}`);
    }
  }
}
