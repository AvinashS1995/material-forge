import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, delay, BehaviorSubject } from 'rxjs';
import { Employee, DEPARTMENTS, Department } from '../models/employee.model';

const MOCK_EMPLOYEES: Employee[] = [
  {
    id: '1', employeeId: 'EMP001', firstName: 'Arjun', lastName: 'Sharma',
    email: 'arjun.sharma@company.com', phone: '+91 98765 43210',
    gender: 'male', birthDate: new Date('1992-03-15'), joiningDate: new Date('2020-01-10'),
    departmentId: 'dept-1', departmentName: 'Engineering', designation: 'Senior Software Engineer',
    salary: 95000, status: 'active',
    address: { street: '12 MG Road', city: 'Ahmedabad', state: 'Gujarat', country: 'India', pinCode: '380001' },
    skills: ['Angular', 'TypeScript', 'Node.js', 'AWS'],
  },
  {
    id: '2', employeeId: 'EMP002', firstName: 'Priya', lastName: 'Patel',
    email: 'priya.patel@company.com', phone: '+91 87654 32109',
    gender: 'female', birthDate: new Date('1995-07-22'), joiningDate: new Date('2021-06-15'),
    departmentId: 'dept-2', departmentName: 'Design', designation: 'UX Designer',
    salary: 75000, status: 'active',
    address: { street: '45 SG Highway', city: 'Surat', state: 'Gujarat', country: 'India', pinCode: '395001' },
    skills: ['Figma', 'Adobe XD', 'UI/UX', 'Prototyping'],
  },
  {
    id: '3', employeeId: 'EMP003', firstName: 'Rahul', lastName: 'Desai',
    email: 'rahul.desai@company.com', phone: '+91 76543 21098',
    gender: 'male', birthDate: new Date('1990-11-05'), joiningDate: new Date('2019-03-20'),
    departmentId: 'dept-3', departmentName: 'Product', designation: 'Product Manager',
    salary: 110000, status: 'active',
    address: { street: '78 FC Road', city: 'Pune', state: 'Maharashtra', country: 'India', pinCode: '411004' },
    skills: ['Product Strategy', 'Agile', 'JIRA', 'Analytics'],
  },
  {
    id: '4', employeeId: 'EMP004', firstName: 'Sneha', lastName: 'Mehta',
    email: 'sneha.mehta@company.com', phone: '+91 65432 10987',
    gender: 'female', birthDate: new Date('1994-04-18'), joiningDate: new Date('2022-01-03'),
    departmentId: 'dept-4', departmentName: 'Marketing', designation: 'Marketing Manager',
    salary: 80000, status: 'on-leave',
    address: { street: '23 Linking Road', city: 'Mumbai', state: 'Maharashtra', country: 'India', pinCode: '400050' },
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
  },
  {
    id: '5', employeeId: 'EMP005', firstName: 'Vikram', lastName: 'Singh',
    email: 'vikram.singh@company.com', phone: '+91 54321 09876',
    gender: 'male', birthDate: new Date('1988-09-30'), joiningDate: new Date('2018-07-01'),
    departmentId: 'dept-1', departmentName: 'Engineering', designation: 'Lead Engineer',
    salary: 125000, status: 'active',
    address: { street: '5 Koramangala', city: 'Bangalore', state: 'Karnataka', country: 'India', pinCode: '560034' },
    skills: ['Java', 'Spring Boot', 'Microservices', 'Docker', 'Kubernetes'],
  },
  {
    id: '6', employeeId: 'EMP006', firstName: 'Ananya', lastName: 'Iyer',
    email: 'ananya.iyer@company.com', phone: '+91 43210 98765',
    gender: 'female', birthDate: new Date('1997-01-12'), joiningDate: new Date('2023-04-01'),
    departmentId: 'dept-6', departmentName: 'HR', designation: 'Recruiter',
    salary: 60000, status: 'active',
    address: { street: '99 Anna Salai', city: 'Chennai', state: 'Tamil Nadu', country: 'India', pinCode: '600002' },
    skills: ['Recruitment', 'Interviewing', 'HR Policies', 'ATS'],
  },
];

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employees = signal<Employee[]>(MOCK_EMPLOYEES);

  readonly allEmployees = this.employees.asReadonly();
  readonly totalCount = computed(() => this.employees().length);
  readonly activeCount = computed(() => this.employees().filter((e) => e.status === 'active').length);

  getAll(): Observable<Employee[]> {
    return of(this.employees()).pipe(delay(300));
  }

  getById(id: string): Observable<Employee | undefined> {
    return of(this.employees().find((e) => e.id === id)).pipe(delay(200));
  }

  create(employee: Omit<Employee, 'id' | 'employeeId'>): Observable<Employee> {
    const newEmp: Employee = {
      ...employee,
      id: crypto.randomUUID(),
      employeeId: `EMP${String(this.employees().length + 1).padStart(3, '0')}`,
    };
    this.employees.update((list) => [...list, newEmp]);
    return of(newEmp).pipe(delay(400));
  }

  update(id: string, changes: Partial<Employee>): Observable<Employee> {
    let updated!: Employee;
    this.employees.update((list) =>
      list.map((e) => {
        if (e.id === id) {
          updated = { ...e, ...changes };
          return updated;
        }
        return e;
      })
    );
    return of(updated).pipe(delay(400));
  }

  delete(id: string): Observable<void> {
    this.employees.update((list) => list.filter((e) => e.id !== id));
    return of(undefined).pipe(delay(300));
  }

  getDepartments(): Observable<Department[]> {
    return of(DEPARTMENTS).pipe(delay(100));
  }
}
