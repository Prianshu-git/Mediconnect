
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../utils/database';
import { Users, Stethoscope, Activity, TrendingUp, LogOut } from 'lucide-react';
import { ConsultationsChart, DoctorRatingsChart, UsersDistributionChart } from './charts/AdminCharts';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const doctors = db.getDoctors();
  const patients = db.getPatients();
  const consultations = db.getConsultations();

  const activeDoctors = doctors.filter(d => d.isActive).length;
  const activePatients = patients.filter(p => p.isActive).length;
  const totalConsultations = consultations.length;
  const pendingConsultations = consultations.filter(c => c.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-300">MediConnect Platform Overview</p>
        </div>
        <Button onClick={logout} variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="glass-morphism border-white/20 hover-lift animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Active Doctors</CardTitle>
            <Stethoscope className="h-4 w-4 text-medical-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{activeDoctors}</div>
            <p className="text-xs text-slate-400">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/20 hover-lift animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-healing-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{activePatients}</div>
            <p className="text-xs text-slate-400">
              +12 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/20 hover-lift animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Consultations</CardTitle>
            <Activity className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalConsultations}</div>
            <p className="text-xs text-slate-400">
              +8 from last week
            </p>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/20 hover-lift animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Pending Reviews</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{pendingConsultations}</div>
            <p className="text-xs text-slate-400">
              -3 from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="glass-morphism border-white/20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="text-white">Monthly Consultations</CardTitle>
            <CardDescription className="text-slate-300">Consultation trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ConsultationsChart />
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="text-white">User Distribution</CardTitle>
            <CardDescription className="text-slate-300">Platform user breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <UsersDistributionChart />
          </CardContent>
        </Card>
      </div>

      <Card className="glass-morphism border-white/20 animate-fade-in mb-8" style={{ animationDelay: '0.6s' }}>
        <CardHeader>
          <CardTitle className="text-white">Specialization Ratings</CardTitle>
          <CardDescription className="text-slate-300">Average doctor ratings by specialization</CardDescription>
        </CardHeader>
        <CardContent>
          <DoctorRatingsChart />
        </CardContent>
      </Card>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doctors Table */}
        <Card className="glass-morphism border-white/20 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <CardHeader>
            <CardTitle className="text-white">Doctors Overview</CardTitle>
            <CardDescription className="text-slate-300">Current doctor statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {doctors.map((doctor, index) => (
                <div key={doctor.id} className="flex items-center justify-between p-2 sm:p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{doctor.name}</p>
                    <p className="text-xs sm:text-sm text-slate-400">{doctor.specialization.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm text-medical-400">{doctor.activePatients} patients</p>
                    <p className="text-xs sm:text-sm text-slate-400">{doctor.experience} years exp.</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${doctor.isActive ? 'bg-healing-400' : 'bg-red-400'}`}></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patients Table */}
        <Card className="glass-morphism border-white/20 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <CardHeader>
            <CardTitle className="text-white">Patients Overview</CardTitle>
            <CardDescription className="text-slate-300">Current patient statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {patients.map((patient, index) => (
                <div key={patient.id} className="flex items-center justify-between p-2 sm:p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{patient.name}</p>
                    <p className="text-xs sm:text-sm text-slate-400">Age: {patient.age}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm text-healing-400">{patient.medicalHistory.length} conditions</p>
                    <p className="text-xs sm:text-sm text-slate-400">{patient.lastVisit || 'No visits'}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${patient.isActive ? 'bg-healing-400' : 'bg-red-400'}`}></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
