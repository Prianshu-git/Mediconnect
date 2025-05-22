
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { Heart, Stethoscope, Users, Shield } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (!success) {
      setError('Invalid credentials. Use password123 for any user.');
    }
  };

  const quickLogin = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center lg:text-left space-y-8 animate-fade-in">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <div className="relative">
                <Heart className="h-12 w-12 text-healing-400 animate-pulse-glow" />
                <Stethoscope className="h-8 w-8 text-medical-400 absolute -bottom-2 -right-2 animate-float" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-healing-400 via-medical-400 to-purple-400 bg-clip-text text-transparent">
                MediConnect
              </h1>
            </div>
            <p className="text-xl text-slate-300 max-w-lg">
              Connecting Healthcare Professionals with Patients for Better Care
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="glass-morphism p-4 rounded-xl hover-lift">
              <Users className="h-8 w-8 text-healing-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white">For Patients</h3>
              <p className="text-sm text-slate-300">Find and consult with qualified doctors</p>
            </div>
            <div className="glass-morphism p-4 rounded-xl hover-lift">
              <Stethoscope className="h-8 w-8 text-medical-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white">For Doctors</h3>
              <p className="text-sm text-slate-300">Manage patients and consultations</p>
            </div>
            <div className="glass-morphism p-4 rounded-xl hover-lift">
              <Shield className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white">For Admins</h3>
              <p className="text-sm text-slate-300">Oversee platform operations</p>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="animate-slide-in-right">
          <Card className="glass-morphism border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
              <CardDescription className="text-slate-300">
                Sign in to your MediConnect account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}
                <Button 
                  type="submit" 
                  className="w-full medical-gradient hover:opacity-90 transition-opacity"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6">
                <p className="text-sm text-slate-300 text-center mb-4">Quick login for demo:</p>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => quickLogin('admin@mediconnect.com')}
                    className="border-healing-500/50 text-healing-400 hover:bg-healing-500/10"
                  >
                    Login as Admin
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => quickLogin('dr.smith@mediconnect.com')}
                    className="border-medical-500/50 text-medical-400 hover:bg-medical-500/10"
                  >
                    Login as Doctor
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => quickLogin('john.doe@email.com')}
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  >
                    Login as Patient
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
