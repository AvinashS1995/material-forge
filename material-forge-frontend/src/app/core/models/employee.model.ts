export type EmployeeStatus = 'active' | 'inactive' | 'on-leave' | 'terminated';
export type EmployeeGender = 'male' | 'female' | 'other';

export interface Department {
  id: string;
  name: string;
  managerId?: string;
}

export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone: string;
  gender: EmployeeGender;
  birthDate: Date | null;
  joiningDate: Date | null;
  departmentId: string;
  departmentName?: string;
  designation: string;
  salary: number;
  status: EmployeeStatus;
  address: Address;
  skills: string[];
  avatar?: string;
  documents?: EmployeeDocument[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
}

export interface EmployeeDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
}

export const DEPARTMENTS: Department[] = [
  { id: 'dept-1', name: 'Engineering' },
  { id: 'dept-2', name: 'Design' },
  { id: 'dept-3', name: 'Product' },
  { id: 'dept-4', name: 'Marketing' },
  { id: 'dept-5', name: 'Sales' },
  { id: 'dept-6', name: 'HR' },
  { id: 'dept-7', name: 'Finance' },
  { id: 'dept-8', name: 'Operations' },
];

export const DESIGNATIONS = [
  'Software Engineer',
  'Senior Software Engineer',
  'Lead Engineer',
  'Principal Engineer',
  'Engineering Manager',
  'Product Manager',
  'UX Designer',
  'UI Designer',
  'QA Engineer',
  'DevOps Engineer',
  'Data Scientist',
  'Business Analyst',
  'HR Manager',
  'Recruiter',
  'Marketing Manager',
  'Sales Executive',
  'Finance Manager',
  'Operations Manager',
];

export const EMPLOYEE_STATUS_LABELS: Record<EmployeeStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  'on-leave': 'On Leave',
  terminated: 'Terminated',
};

export const EMPLOYEE_STATUS_COLORS: Record<EmployeeStatus, string> = {
  active: 'green',
  inactive: 'gray',
  'on-leave': 'orange',
  terminated: 'red',
};
