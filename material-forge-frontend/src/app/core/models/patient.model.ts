export type PatientStatus = 'active' | 'discharged' | 'critical' | 'scheduled';
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';

export interface Speciality {
  id: string;
  name: string;
  icon?: string;
}

export interface Doctor {
  doctorId: string;
  doctorName: string;
  specialityId: string;
  specialityName?: string;
  experience?: number;
  available?: boolean;
}

export interface Patient {
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup: BloodGroup;
  phone: string;
  email?: string;
  address: string;
  doctorId: string;
  doctorName?: string;
  specialityId: string;
  specialityName?: string;
  diagnosis: string;
  admissionDate: Date | null;
  status: PatientStatus;
  prescriptions?: Prescription[];
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  medicines: Medicine[];
  notes?: string;
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export const SPECIALITIES: Speciality[] = [
  { id: 'sp-1', name: 'Cardiology', icon: 'favorite' },
  { id: 'sp-2', name: 'Neurology', icon: 'psychology' },
  { id: 'sp-3', name: 'Orthopedics', icon: 'accessible' },
  { id: 'sp-4', name: 'Pediatrics', icon: 'child_care' },
  { id: 'sp-5', name: 'Dermatology', icon: 'spa' },
  { id: 'sp-6', name: 'Ophthalmology', icon: 'visibility' },
  { id: 'sp-7', name: 'ENT', icon: 'hearing' },
  { id: 'sp-8', name: 'General Medicine', icon: 'medical_services' },
];

export const DOCTORS: Doctor[] = [
  { doctorId: 'dr-1', doctorName: 'Dr. Rajesh Sharma', specialityId: 'sp-1', specialityName: 'Cardiology', experience: 15 },
  { doctorId: 'dr-2', doctorName: 'Dr. Priya Patel', specialityId: 'sp-2', specialityName: 'Neurology', experience: 12 },
  { doctorId: 'dr-3', doctorName: 'Dr. Amit Kumar', specialityId: 'sp-3', specialityName: 'Orthopedics', experience: 10 },
  { doctorId: 'dr-4', doctorName: 'Dr. Sunita Verma', specialityId: 'sp-4', specialityName: 'Pediatrics', experience: 8 },
  { doctorId: 'dr-5', doctorName: 'Dr. Vikram Singh', specialityId: 'sp-5', specialityName: 'Dermatology', experience: 7 },
  { doctorId: 'dr-6', doctorName: 'Dr. Meera Iyer', specialityId: 'sp-8', specialityName: 'General Medicine', experience: 20 },
];

export const PATIENT_STATUS_COLORS: Record<PatientStatus, string> = {
  active: 'green',
  discharged: 'blue',
  critical: 'red',
  scheduled: 'orange',
};
