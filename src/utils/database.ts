
import { User, Doctor, Patient, Consultation } from '../types';

// Sample database for local development
class LocalDatabase {
  private users: User[] = [];
  private doctors: Doctor[] = [];
  private patients: Patient[] = [];
  private consultations: Consultation[] = [];

  constructor() {
    // Initialize with empty arrays
    this.users = [];
    this.doctors = [];
    this.patients = [];
    this.consultations = [];
  }

  // Initialize sample data for the application
  initializeSampleData() {
    // Only initialize if data is not already set up
    if (this.users.length > 0) return;

    // Admin user
    const admin: User = {
      id: '1',
      name: 'Admin User',
      email: 'admin@mediconnect.com',
      role: 'admin',
      createdAt: new Date().toISOString(),
    };

    // Doctors
    const doctorsData: Doctor[] = [
      {
        id: '2',
        name: 'Dr. Sarah Smith',
        email: 'dr.smith@mediconnect.com',
        specialization: ['Cardiology', 'Internal Medicine'],
        experience: 8,
        rating: 4.8,
        activePatients: 24,
        isActive: true,
        availableHours: '9:00-17:00',
        consultationFee: 75,
        bio: 'Specialized in cardiovascular health with 8 years of clinical experience.',
      },
      {
        id: '3',
        name: 'Dr. Michael Johnson',
        email: 'dr.johnson@mediconnect.com',
        specialization: ['Neurology', 'Psychiatry'],
        experience: 12,
        rating: 4.9,
        activePatients: 18,
        isActive: true,
        availableHours: '10:00-18:00',
        consultationFee: 90,
        bio: 'Expert in neurological disorders with over a decade of experience.',
      },
      {
        id: '4',
        name: 'Dr. Emily Wilson',
        email: 'dr.wilson@mediconnect.com',
        specialization: ['Pediatrics', 'Family Medicine'],
        experience: 6,
        rating: 4.7,
        activePatients: 32,
        isActive: false,
        availableHours: '8:00-16:00',
        consultationFee: 65,
        bio: 'Compassionate pediatrician dedicated to children\'s wellbeing.',
      },
    ];

    // Patients
    const patientsData: Patient[] = [
      {
        id: '5',
        name: 'John Doe',
        email: 'john.doe@email.com',
        age: 35,
        medicalHistory: ['Hypertension', 'Allergies'],
        assignedDoctor: '2',
        lastVisit: '2023-04-15',
        upcomingAppointment: '2023-05-20',
        isActive: true,
      },
      {
        id: '6',
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        age: 28,
        medicalHistory: ['Asthma'],
        assignedDoctor: '3',
        lastVisit: '2023-03-22',
        upcomingAppointment: '2023-05-18',
        isActive: true,
      },
      {
        id: '7',
        name: 'Robert Johnson',
        email: 'robert.johnson@email.com',
        age: 45,
        medicalHistory: ['Diabetes Type 2', 'High Cholesterol'],
        assignedDoctor: '2',
        lastVisit: '2023-04-30',
        upcomingAppointment: null,
        isActive: false,
      },
      {
        id: '8',
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        age: 32,
        medicalHistory: ['Migraine', 'Anxiety'],
        assignedDoctor: '3',
        lastVisit: '2023-04-05',
        upcomingAppointment: '2023-05-25',
        isActive: true,
      },
    ];

    // Consultations
    const consultationsData: Consultation[] = [
      {
        id: '1',
        patientId: '5',
        doctorId: '2',
        date: '2023-04-15',
        duration: 30,
        notes: 'Blood pressure is under control. Continue with current medication.',
        status: 'completed',
      },
      {
        id: '2',
        patientId: '6',
        doctorId: '3',
        date: '2023-03-22',
        duration: 45,
        notes: 'Asthma symptoms have improved. Adjusted medication dosage.',
        status: 'completed',
      },
      {
        id: '3',
        patientId: '7',
        doctorId: '2',
        date: '2023-04-30',
        duration: 60,
        notes: 'Glucose levels are stabilizing. Diet plan is working well.',
        status: 'completed',
      },
      {
        id: '4',
        patientId: '5',
        doctorId: '2',
        date: '2023-05-20',
        duration: 30,
        notes: '',
        status: 'pending',
      },
      {
        id: '5',
        patientId: '6',
        doctorId: '3',
        date: '2023-05-18',
        duration: 30,
        notes: '',
        status: 'pending',
      },
      {
        id: '6',
        patientId: '8',
        doctorId: '3',
        date: '2023-05-25',
        duration: 45,
        notes: '',
        status: 'pending',
      },
    ];

    // Add users
    const doctorUsers = doctorsData.map(doctor => ({
      id: doctor.id,
      name: doctor.name,
      email: doctor.email,
      role: 'doctor' as const,
      createdAt: new Date().toISOString(),
    }));

    const patientUsers = patientsData.map(patient => ({
      id: patient.id,
      name: patient.name,
      email: patient.email,
      role: 'patient' as const,
      createdAt: new Date().toISOString(),
    }));

    this.users = [admin, ...doctorUsers, ...patientUsers];
    this.doctors = doctorsData;
    this.patients = patientsData;
    this.consultations = consultationsData;
  }

  // User methods
  getUserByEmail(email: string): User | null {
    return this.users.find(user => user.email === email) || null;
  }

  // Doctor methods
  getDoctors(): Doctor[] {
    return this.doctors;
  }

  getDoctorById(id: string): Doctor | null {
    return this.doctors.find(doctor => doctor.id === id) || null;
  }

  getDoctorByEmail(email: string): Doctor | null {
    return this.doctors.find(doctor => doctor.email === email) || null;
  }

  // Patient methods
  getPatients(): Patient[] {
    return this.patients;
  }

  getPatientById(id: string): Patient | null {
    return this.patients.find(patient => patient.id === id) || null;
  }

  getPatientByEmail(email: string): Patient | null {
    return this.patients.find(patient => patient.email === patient.email) || null;
  }

  getPatientsByDoctorId(doctorId: string): Patient[] {
    return this.patients.filter(patient => patient.assignedDoctor === doctorId);
  }

  // Consultation methods
  getConsultations(): Consultation[] {
    return this.consultations;
  }

  getConsultationsByDoctorId(doctorId: string): Consultation[] {
    return this.consultations.filter(consultation => consultation.doctorId === doctorId);
  }

  getConsultationsByPatientId(patientId: string): Consultation[] {
    return this.consultations.filter(consultation => consultation.patientId === patientId);
  }
}

export const db = new LocalDatabase();
