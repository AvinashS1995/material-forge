import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Patient, Doctor, Speciality, DOCTORS, SPECIALITIES } from '../models/patient.model';

const MOCK_PATIENTS: Patient[] = [
  {
    id: '1', patientId: 'PAT001', firstName: 'Ramesh', lastName: 'Kumar',
    age: 55, gender: 'male', bloodGroup: 'B+', phone: '+91 98765 11111',
    email: 'ramesh@email.com', address: '45 Park Street, Ahmedabad',
    doctorId: 'dr-1', doctorName: 'Dr. Rajesh Sharma',
    specialityId: 'sp-1', specialityName: 'Cardiology',
    diagnosis: 'Hypertension', admissionDate: new Date('2026-09-01'), status: 'active',
  },
  {
    id: '2', patientId: 'PAT002', firstName: 'Geeta', lastName: 'Shah',
    age: 35, gender: 'female', bloodGroup: 'A+', phone: '+91 87654 22222',
    address: '12 SG Highway, Surat',
    doctorId: 'dr-4', doctorName: 'Dr. Sunita Verma',
    specialityId: 'sp-4', specialityName: 'Pediatrics',
    diagnosis: 'Viral Fever', admissionDate: new Date('2026-09-10'), status: 'discharged',
  },
  {
    id: '3', patientId: 'PAT003', firstName: 'Mohit', lastName: 'Verma',
    age: 42, gender: 'male', bloodGroup: 'O-', phone: '+91 76543 33333',
    address: '78 FC Road, Pune',
    doctorId: 'dr-2', doctorName: 'Dr. Priya Patel',
    specialityId: 'sp-2', specialityName: 'Neurology',
    diagnosis: 'Migraine', admissionDate: new Date('2026-09-15'), status: 'active',
  },
  {
    id: '4', patientId: 'PAT004', firstName: 'Sunita', lastName: 'Rao',
    age: 68, gender: 'female', bloodGroup: 'AB+', phone: '+91 65432 44444',
    address: '23 MG Road, Bangalore',
    doctorId: 'dr-1', doctorName: 'Dr. Rajesh Sharma',
    specialityId: 'sp-1', specialityName: 'Cardiology',
    diagnosis: 'Arrhythmia', admissionDate: new Date('2026-09-18'), status: 'critical',
  },
];

@Injectable({ providedIn: 'root' })
export class PatientService {
  private patients = signal<Patient[]>(MOCK_PATIENTS);

  readonly allPatients = this.patients.asReadonly();
  readonly totalCount = computed(() => this.patients().length);
  readonly activeCount = computed(() => this.patients().filter((p) => p.status === 'active').length);
  readonly criticalCount = computed(() => this.patients().filter((p) => p.status === 'critical').length);

  getAll(): Observable<Patient[]> {
    return of(this.patients()).pipe(delay(300));
  }

  getById(id: string): Observable<Patient | undefined> {
    return of(this.patients().find((p) => p.id === id)).pipe(delay(200));
  }

  create(patient: Omit<Patient, 'id' | 'patientId'>): Observable<Patient> {
    const newPatient: Patient = {
      ...patient,
      id: crypto.randomUUID(),
      patientId: `PAT${String(this.patients().length + 1).padStart(3, '0')}`,
    };
    this.patients.update((list) => [...list, newPatient]);
    return of(newPatient).pipe(delay(400));
  }

  update(id: string, changes: Partial<Patient>): Observable<Patient> {
    let updated!: Patient;
    this.patients.update((list) =>
      list.map((p) => {
        if (p.id === id) { updated = { ...p, ...changes }; return updated; }
        return p;
      })
    );
    return of(updated).pipe(delay(400));
  }

  delete(id: string): Observable<void> {
    this.patients.update((list) => list.filter((p) => p.id !== id));
    return of(undefined).pipe(delay(300));
  }

  getDoctors(): Observable<Doctor[]> {
    return of(DOCTORS).pipe(delay(100));
  }

  getDoctorsBySpeciality(specialityId: string): Observable<Doctor[]> {
    return of(DOCTORS.filter((d) => d.specialityId === specialityId)).pipe(delay(100));
  }

  getSpecialities(): Observable<Speciality[]> {
    return of(SPECIALITIES).pipe(delay(100));
  }
}
