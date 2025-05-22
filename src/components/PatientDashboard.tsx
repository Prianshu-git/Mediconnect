
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../utils/database';
import { Doctor } from '../types';
import { Search, Star, Clock, DollarSign, LogOut, MessageCircle } from 'lucide-react';
import ChatInterface from './ChatInterface';
import { useIsMobile } from '@/hooks/use-mobile';

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showChat, setShowChat] = useState(false);
  const doctors = db.getDoctors();
  const isMobile = useIsMobile();

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowChat(true);
  };

  if (showChat && selectedDoctor) {
    return (
      <ChatInterface 
        doctor={selectedDoctor} 
        onBack={() => setShowChat(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Patient Portal</h1>
          <p className="text-slate-300">Welcome back, {user?.name}</p>
        </div>
        <Button onClick={logout} variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Search Section */}
      <Card className="glass-morphism border-white/20 mb-6 sm:mb-8 animate-fade-in">
        <CardHeader className="py-4 sm:py-6">
          <CardTitle className="text-white flex items-center">
            <Search className="h-5 w-5 mr-2 text-healing-400" />
            Find Your Doctor
          </CardTitle>
          <CardDescription className="text-slate-300">
            Browse available doctors and book consultations
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {doctors.map((doctor, index) => (
          <Card 
            key={doctor.id} 
            className="glass-morphism border-white/20 hover-lift animate-fade-in cursor-pointer group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="py-3 sm:py-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white group-hover:text-medical-400 transition-colors">
                    {doctor.name}
                  </CardTitle>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-slate-300 ml-1">{doctor.rating}</span>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${doctor.isActive ? 'bg-healing-400 animate-pulse-glow' : 'bg-red-400'}`}></div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-sm text-slate-400 mb-2">Specializations</p>
                <div className="flex flex-wrap gap-1">
                  {doctor.specialization.map((spec, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-medical-500/20 text-medical-300 border-medical-500/30">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center text-sm text-slate-300">
                <Clock className="h-4 w-4 mr-2 text-healing-400" />
                Available: {doctor.availableHours}
              </div>

              <div className="flex items-center text-sm text-slate-300">
                <DollarSign className="h-4 w-4 mr-2 text-yellow-400" />
                ${doctor.consultationFee} per consultation
              </div>

              {!isMobile && (
                <p className="text-sm text-slate-400">{doctor.bio.length > 120 ? `${doctor.bio.substring(0, 120)}...` : doctor.bio}</p>
              )}

              <div className="pt-2">
                <Button 
                  onClick={() => handleSelectDoctor(doctor)}
                  className="w-full medical-gradient hover:opacity-90 transition-opacity"
                  disabled={!doctor.isActive}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {doctor.isActive ? 'Start Consultation' : 'Currently Offline'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <Card className="glass-morphism border-white/20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <CardHeader className="py-3 sm:py-4">
            <CardTitle className="text-lg text-white">Your Health Summary</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 sm:pb-6">
            <div className="space-y-2">
              <p className="text-sm text-slate-300">Recent Consultations: <span className="text-white">3</span></p>
              <p className="text-sm text-slate-300">Next Appointment: <span className="text-white">Tomorrow 2:00 PM</span></p>
              <p className="text-sm text-slate-300">Prescriptions: <span className="text-white">2 Active</span></p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <CardHeader className="py-3 sm:py-4">
            <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 sm:pb-6">
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full border-healing-500/50 text-healing-400 hover:bg-healing-500/10">
                Book Checkup
              </Button>
              <Button variant="outline" size="sm" className="w-full border-medical-500/50 text-medical-400 hover:bg-medical-500/10">
                View Reports
              </Button>
              <Button variant="outline" size="sm" className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                Emergency
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-white/20 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <CardHeader className="py-3 sm:py-4">
            <CardTitle className="text-lg text-white">Health Tips</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 sm:pb-6">
            <div className="space-y-2">
              <p className="text-sm text-slate-300">💧 Drink 8 glasses of water daily</p>
              <p className="text-sm text-slate-300">🏃 Exercise for 30 minutes</p>
              <p className="text-sm text-slate-300">😴 Get 7-8 hours of sleep</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
