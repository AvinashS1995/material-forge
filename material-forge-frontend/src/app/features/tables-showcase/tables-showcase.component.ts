import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ReusableTableComponent } from '../../shared/components/reusable-table/reusable-table.component';
import { ReusableButtonComponent } from '../../shared/components/reusable-button/reusable-button.component';
import { NotificationService } from '../../core/services/notification.service';
import { DialogService } from '../../core/services/dialog.service';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee, EMPLOYEE_STATUS_COLORS } from '../../core/models/employee.model';
import { TableColumn, TableAction, ActionEvent } from '../../shared/models/table.model';

@Component({
  selector: 'app-tables-showcase',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule,
    PageHeaderComponent, ReusableTableComponent, ReusableButtonComponent,
  ],
  templateUrl: './tables-showcase.component.html',
  styleUrl: './tables-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablesShowcaseComponent implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  private readonly notification = inject(NotificationService);
  private readonly dialogService = inject(DialogService);

  readonly loading = signal(true);
  readonly employees = signal<Employee[]>([]);
  readonly selected = signal<Employee[]>([]);

  readonly columns: TableColumn<Employee>[] = [
    { key: 'employeeId', header: 'ID', width: '80px', sortable: true },
    { key: 'fullName', header: 'Name', sortable: true,
      format: (_, row) => `${row.firstName} ${row.lastName}` },
    { key: 'email', header: 'Email', type: 'email', sortable: true },
    { key: 'departmentName', header: 'Department', sortable: true },
    { key: 'designation', header: 'Designation', sortable: true },
    { key: 'salary', header: 'Salary', type: 'currency', sortable: true, align: 'right' },
    { key: 'joiningDate', header: 'Joined', type: 'date', sortable: true },
    {
      key: 'status', header: 'Status', type: 'badge', sortable: true,
      badgeConfig: { colorMap: EMPLOYEE_STATUS_COLORS },
    },
  ];

  readonly actions: TableAction<Employee>[] = [
    { id: 'view', label: 'View', icon: 'visibility', color: 'primary', tooltip: 'View details' },
    { id: 'edit', label: 'Edit', icon: 'edit', tooltip: 'Edit employee' },
    { id: 'delete', label: 'Delete', icon: 'delete', color: 'warn', tooltip: 'Delete employee' },
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
        message: `Are you sure you want to delete ${event.row.firstName} ${event.row.lastName}?`,
        type: 'danger', confirmText: 'Delete', cancelText: 'Cancel',
      }).subscribe((confirmed) => {
        if (confirmed) {
          this.employeeService.delete(event.row.id).subscribe(() => {
            this.employees.set(this.employees().filter((e) => e.id !== event.row.id));
            this.notification.success('Employee deleted successfully');
          });
        }
      });
    } else if (event.actionId === 'view') {
      this.notification.info(`Viewing: ${event.row.firstName} ${event.row.lastName}`);
    } else {
      this.notification.info(`Editing: ${event.row.firstName} ${event.row.lastName}`);
    }
  }

  onSelectionChange(rows: Employee[]): void {
    this.selected.set(rows);
  }
}
