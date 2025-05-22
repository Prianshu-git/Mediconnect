
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Doctor } from '../types';
import { ArrowLeft, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ChatInterfaceProps {
  doctor: Doctor;
  onBack: () => void;
}

// Sample patient prompts for varied chat interactions
const samplePatientPrompts = [
  "I've been experiencing frequent headaches, especially in the morning. Should I be concerned?",
  "My allergies seem worse this season than before. What can I do to manage them better?",
  "I've been having trouble sleeping lately. Any recommendations?",
  "My knee has been hurting after my weekend runs. Is this something I should rest or keep active?",
  "I've been feeling more anxious than usual. Are there any techniques you recommend for managing anxiety?",
  "My child has a fever of 101°F. When should I be concerned?",
  "I've been experiencing heartburn frequently after meals. What dietary changes would you suggest?",
  "My blood pressure readings have been slightly elevated. What lifestyle changes could help?",
  "I've been experiencing occasional dizziness. Could this be related to my medication?",
  "I'm planning to start a new exercise routine. Any precautions I should take given my history?"
];

// Mock API response patterns to simulate AI-assisted doctor responses
const generateDoctorResponse = (message: string, doctorName: string): string => {
  if (message.toLowerCase().includes('headache')) {
    return `Based on what you've described about your headaches, there are several potential causes. It could be tension, dehydration, or eyestrain. I'd recommend tracking when they occur and what might trigger them. Let's discuss this further during your next appointment.`;
  } else if (message.toLowerCase().includes('sleep') || message.toLowerCase().includes('sleeping')) {
    return `Sleep issues can be disruptive. Try establishing a regular sleep schedule, avoid screens before bed, and create a comfortable sleep environment. If these continue, we should consider a more detailed evaluation.`;
  } else if (message.toLowerCase().includes('anxiety') || message.toLowerCase().includes('stress')) {
    return `Anxiety can be challenging to manage. Deep breathing exercises, regular physical activity, and mindfulness practices might help. Let's discuss more comprehensive strategies during your next visit.`;
  } else if (message.toLowerCase().includes('pain') || message.toLowerCase().includes('hurt')) {
    return `For pain management, consider rest, appropriate over-the-counter medications, and ice/heat therapy as needed. I'd like to examine this more closely at your appointment to determine the underlying cause.`;
  } else {
    return `Thank you for sharing that information with me. Based on what you've told me, I recommend discussing this in more detail during our appointment. In the meantime, please monitor your symptoms and note any changes or patterns.`;
  }
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ doctor, onBack }) => {
  const [messages, setMessages] = useState<{ sender: 'user' | 'doctor', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Simulated doctor welcome message and random patient prompt suggestion
  useEffect(() => {
    const randomPromptIndex = Math.floor(Math.random() * samplePatientPrompts.length);
    
    setTimeout(() => {
      setMessages([
        { sender: 'doctor', text: `Hello! I'm Dr. ${doctor.name.split(' ')[1]}. How can I help you today?` }
      ]);
      
      // Add suggestion for a sample prompt after a delay
      setTimeout(() => {
        toast({
          title: "Sample Question",
          description: `Try asking: "${samplePatientPrompts[randomPromptIndex]}"`,
          duration: 8000,
        });
      }, 2000);
    }, 1000);
  }, [doctor, toast]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setInput('');
    setIsTyping(true);
    
    // Simulate API call for doctor response
    setTimeout(() => {
      setIsTyping(false);
      
      // Generate a context-aware response based on the user's message
      const aiResponse = generateDoctorResponse(input, doctor.name);
      
      setMessages(prev => [
        ...prev, 
        { sender: 'doctor', text: aiResponse }
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
            <h2 className="text-xl sm:text-2xl font-bold text-white">Dr. {doctor.name}</h2>
            <p className="text-sm sm:text-base text-slate-300">{doctor.specialization.join(', ')}</p>
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
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] sm:max-w-[80%] px-3 py-2 sm:px-4 sm:py-3 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-healing-500/20 text-white' 
                        : 'bg-medical-500/20 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-medical-500/20 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-medical-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-medical-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-medical-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
            placeholder="Type your message..."
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

export default ChatInterface;
