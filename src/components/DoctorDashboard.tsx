
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../utils/database';
import { LogOut, Calendar, Users, Clock, FileText, MessageCircle } from 'lucide-react';
import { Patient } from '../types';
import ChatInterface from './ChatInterface';
import PatientChatInterface from './PatientChatInterface';

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showChat, setShowChat] = useState(false);
  
  const doctor = user ? db.getDoctorByEmail(user.email) : null;
  const consultations = doctor ? db.getConsultationsByDoctorId(doctor.id) : [];
  const patients = doctor ? db.getPatientsByDoctorId(doctor.id) : [];
  
  const pendingConsultations = consultations.filter(c => c.status === 'pending');
  const completedConsultations = consultations.filter(c => c.status === 'completed');
  
  const handleStartChat = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowChat(true);
  };
  
  if (showChat && selectedPatient) {
    return <PatientChatInterface patient={selectedPatient} onBack={() => setShowChat(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Doctor Dashboard</h1>
          <p className="text-slate-300">Welcome, {user?.name}</p>
        </div>
        <Button onClick={logout} variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="glass-morphism border-white/20 hover-lift animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 sm:pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-medical-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{patients.filter(p => p.isActive).length}</div>
            <p className="text-xs text-slate-400">
              {patients.length} total patients
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/20 hover-lift animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 sm:pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Upcoming Consultations</CardTitle>
            <Calendar className="h-4 w-4 text-healing-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{pendingConsultations.length}</div>
            <p className="text-xs text-slate-400">
              Next: {pendingConsultations[0]?.date || 'None scheduled'}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/20 hover-lift animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 sm:pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Completed Consultations</CardTitle>
            <FileText className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{completedConsultations.length}</div>
            <p className="text-xs text-slate-400">
              This month: {completedConsultations.length}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/20 hover-lift animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 sm:pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Working Hours</CardTitle>
            <Clock className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white">{doctor?.availableHours || 'Not set'}</div>
            <p className="text-xs text-slate-400">
              Consultation Fee: ${doctor?.consultationFee}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patients */}
        <Card className="glass-morphism border-white/20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="py-4 sm:py-6">
            <CardTitle className="text-white">My Patients</CardTitle>
            <CardDescription className="text-slate-300">
              Manage your assigned patients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {patients.length > 0 ? (
                patients.map(patient => (
                  <div key={patient.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-white/5 rounded-lg gap-3 sm:gap-0">
                    <div>
                      <p className="font-medium text-white">{patient.name}</p>
                      <div className="flex flex-wrap sm:flex-nowrap items-center text-sm text-slate-400 gap-1 sm:gap-0">
                        <span>Age: {patient.age}</span>
                        <span className="hidden sm:inline-block mx-2">•</span>
                        <span>Last visit: {patient.lastVisit || 'None'}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${patient.isActive ? 'bg-healing-400' : 'bg-red-400'} mr-3`}></div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-medical-500/50 text-medical-400 hover:bg-medical-500/10"
                        onClick={() => handleStartChat(patient)}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-center py-6">No patients assigned</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Appointments */}
        <Card className="glass-morphism border-white/20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <CardHeader className="py-4 sm:py-6">
            <CardTitle className="text-white">Upcoming Consultations</CardTitle>
            <CardDescription className="text-slate-300">
              Your scheduled appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {pendingConsultations.length > 0 ? (
                pendingConsultations.map((consultation) => {
                  const patient = db.getPatientById(consultation.patientId);
                  return (
                    <div key={consultation.id} className="p-3 bg-white/5 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2 sm:gap-0">
                        <p className="font-medium text-white">{patient?.name}</p>
                        <Badge variant="outline" className="border-healing-500/50 text-healing-400 w-fit">
                          {consultation.duration} min
                        </Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                        <div className="text-sm text-slate-400">
                          <p>Date: {consultation.date}</p>
                          <p>Reason: General checkup</p>
                        </div>
                        <Button
                          size="sm"
                          className="medical-gradient hover:opacity-90 transition-opacity w-full sm:w-auto mt-2 sm:mt-0"
                        >
                          Prepare
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-400 text-center py-6">No upcoming consultations</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;
