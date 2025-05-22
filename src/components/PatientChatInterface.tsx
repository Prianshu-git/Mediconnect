
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Patient } from '../types';
import { ArrowLeft, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PatientChatInterfaceProps {
  patient: Patient;
  onBack: () => void;
}

// Sample patient AI prompts
const samplePatientPrompts = [
  "Doctor, I've been experiencing severe headaches for the past week. They're mostly on one side of my head.",
  "I have this persistent cough that won't go away even after taking over-the-counter medicine.",
  "My joints have been really stiff in the morning. It takes me almost an hour before I can move normally.",
  "Doctor, I'm having trouble sleeping. I lie awake for hours before I can fall asleep.",
  "I've noticed some unusual spots on my skin that weren't there before. Should I be concerned?",
  "My allergies seem to be getting worse every year. Is there something more effective I could try?",
  "I've been feeling really tired lately, even when I get enough sleep. Could there be something wrong?",
  "Doctor, my blood pressure readings at home have been higher than usual.",
  "I've been experiencing shortness of breath when climbing stairs. I used to be able to do this easily.",
  "My child has been complaining about stomach pains for the last few days. They're not eating well either."
];

// Function to generate AI patient responses based on doctor's messages
const generatePatientResponse = (doctorMessage: string, patientName: string): string => {
  if (doctorMessage.toLowerCase().includes('pain') || doctorMessage.toLowerCase().includes('hurt')) {
    return `It's a sharp pain that comes and goes. Sometimes it's worse in the morning, but it can happen any time of day really. I've tried taking some ibuprofen but it only helps temporarily.`;
  } else if (doctorMessage.toLowerCase().includes('medication') || doctorMessage.toLowerCase().includes('medicine')) {
    return `I'm currently taking lisinopril for my blood pressure and occasionally ibuprofen for pain. I don't think I'm allergic to any medications that I know of.`;
  } else if (doctorMessage.toLowerCase().includes('symptom') || doctorMessage.toLowerCase().includes('feeling')) {
    return `Besides what I mentioned, I've also been feeling more tired than usual. I'm not sure if it's related, but I've had less appetite too.`;
  } else if (doctorMessage.toLowerCase().includes('history') || doctorMessage.toLowerCase().includes('family')) {
    return `My father had high blood pressure and diabetes. My mother is generally healthy. I don't know much about my grandparents' health history.`;
  } else if (doctorMessage.toLowerCase().includes('test') || doctorMessage.toLowerCase().includes('examination')) {
    return `The last time I had a blood test was about 6 months ago. Everything was normal except my cholesterol was slightly elevated.`;
  } else {
    return `I'm not sure how to answer that exactly. Can you explain what you mean, doctor? I want to make sure I'm providing the information you need to help me.`;
  }
};

const PatientChatInterface: React.FC<PatientChatInterfaceProps> = ({ patient, onBack }) => {
  const [messages, setMessages] = useState<{ sender: 'doctor' | 'patient', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Generate initial patient message with a random complaint
  useEffect(() => {
    const randomPromptIndex = Math.floor(Math.random() * samplePatientPrompts.length);
    
    setTimeout(() => {
      setMessages([
        { 
          sender: 'patient', 
          text: `Hello doctor. ${samplePatientPrompts[randomPromptIndex]}` 
        }
      ]);
      
      // Add suggestion for how to respond
      setTimeout(() => {
        toast({
          title: "Doctor Tip",
          description: "Ask follow-up questions to understand the patient's condition better.",
          duration: 6000,
        });
      }, 2000);
    }, 1000);
  }, [patient, toast]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add doctor message
    setMessages(prev => [...prev, { sender: 'doctor', text: input }]);
    setInput('');
    setIsTyping(true);
    
    // Simulate patient response
    setTimeout(() => {
      setIsTyping(false);
      
      // Generate a context-aware response based on the doctor's message
      const aiResponse = generatePatientResponse(input, patient.name);
      
      setMessages(prev => [
        ...prev, 
        { sender: 'patient', text: aiResponse }
      ]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-4 sm:mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/10 mr-2 sm:mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{patient.name}</h2>
            <p className="text-sm sm:text-base text-slate-300">Patient • {patient.age} years old</p>
          </div>
        </div>

        {/* Chat Container */}
        <Card className="glass-morphism border-white/20 mb-4 overflow-hidden">
          <CardContent className="p-0">
            {/* Messages Area */}
            <div className="h-[60vh] overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] sm:max-w-[80%] px-3 py-2 sm:px-4 sm:py-3 rounded-lg ${
                      msg.sender === 'doctor' 
                        ? 'bg-medical-500/20 text-white' 
                        : 'bg-healing-500/20 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-healing-500/20 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-healing-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-healing-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-healing-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>

        {/* Input Area */}
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your response..."
            className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
          />
          <Button 
            onClick={handleSendMessage}
            className="medical-gradient hover:opacity-90 transition-opacity"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientChatInterface;
