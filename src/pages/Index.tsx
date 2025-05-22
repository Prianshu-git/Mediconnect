
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import AdminDashboard from '../components/AdminDashboard';
import DoctorDashboard from '../components/DoctorDashboard';
import PatientDashboard from '../components/PatientDashboard';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-healing-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading MediConnect...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'patient':
      return <PatientDashboard />;
    default:
      return <LoginForm />;
  }
};

export default Index;
