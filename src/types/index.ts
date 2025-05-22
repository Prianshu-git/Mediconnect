
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  createdAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string[];
  experience: number;
  rating: number;
  activePatients: number;
  isActive: boolean;
  availableHours: string;
  consultationFee: number;
  bio: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  medicalHistory: string[];
  assignedDoctor: string | null;
  lastVisit: string | null;
  upcomingAppointment: string | null;
  isActive: boolean;
}

export interface Consultation {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  duration: number;
  notes: string;
  status: 'pending' | 'completed' | 'cancelled';
}
