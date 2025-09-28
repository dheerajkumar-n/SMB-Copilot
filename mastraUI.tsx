'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  action?: 'render_employee_form';
  data?: {
    name: string;
    email?: string;
    phone?: string;
    payRate: number;
    hoursPerWeek: number;
    availability: string[];
    startDate: Date;
  };
}

interface MessageContentProps {
  message: Message;
}

const MessageContent: React.FC<MessageContentProps> = ({ message }) => {
  if (message.action === 'render_employee_form' && message.data) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 bg-white">
            <h3 className="text-xl font-semibold mb-4">New Employee Summary</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium">{message.data.name}</p>
                {message.data.email && (
                  <p className="text-gray-600">{message.data.email}</p>
                )}
              </div>
              <div className="flex space-x-4">
                <div>
                  <p className="text-sm text-gray-500">Pay Rate</p>
                  <p className="font-medium">${message.data.payRate}/hour</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hours per Week</p>
                  <p className="font-medium">{message.data.hoursPerWeek} hours</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Availability</p>
                <div className="flex flex-wrap gap-2">
                  {message.data.availability.map((day) => (
                    <span key={day} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="outline" onClick={() => console.log('Edit clicked')}>Edit Info</Button>
                <Button onClick={() => console.log('Confirm clicked')}>Confirm & Save</Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className={p-4 rounded-lg ${message.role === 'assistant' ? 'bg-gray-50' : ''}}>
      {message.content}
    </div>
  );
};

export default function MastraChatUI() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I can help you manage your employees. Try saying "Add Sarah Johnson, $28/hour, 22 hours/week, Mon-Fri, start Sep 28"'
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    if (input.toLowerCase().includes('add')) {
      const name = input.match(/add ([\w\s]+),/)?.[1] || 'Unknown';
      const payRate = parseInt(input.match(/\$(\d+)/)?.[1] || '0');
      const hours = parseInt(input.match(/(\d+)\s*hours?/)?.[1] || '0');
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      
      const aiResponse: Message = {
        role: 'assistant',
        action: 'render_employee_form',
        content: 'Here\'s a summary of the new employee. Please review and confirm.',
        data: {
          name,
          payRate,
          hoursPerWeek: hours,
          availability: days,
          startDate: new Date('2025-09-28')
        }
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'I understand you want to ' + input + '. However, I can only help with adding new employees right now.'
        }]);
      }, 1000);
    }

    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <MessageContent key={i} message={msg} />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add an employee or ask for help..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button type="submit">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}

type Message = {
  role: 'user' | 'assistant';
  content: string;
  action?: 'render_employee_form';
  data?: {
    name: string;
    email?: string;
    phone?: string;
    payRate: number;
    hoursPerWeek: number;
    availability: string[];
    startDate: Date;
  };
};

const MessageContent: React.FC<{ message: Message }> = ({ message }) => {
  if (message.action === 'render_employee_form' && message.data) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 bg-white">
            <h3 className="text-xl font-semibold mb-4">New Employee Summary</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium">{message.data.name}</p>
                {message.data.email && (
                  <p className="text-gray-600">{message.data.email}</p>
                )}
              </div>
              <div className="flex space-x-4">
                <div>
                  <p className="text-sm text-gray-500">Pay Rate</p>
                  <p className="font-medium">${message.data.payRate}/hour</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hours per Week</p>
                  <p className="font-medium">{message.data.hoursPerWeek} hours</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Availability</p>
                <div className="flex flex-wrap gap-2">
                  {message.data.availability.map((day) => (
                    <span key={day} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="outline" onClick={() => console.log('Edit clicked')}>Edit Info</Button>
                <Button onClick={() => console.log('Confirm clicked')}>Confirm & Save</Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className={p-4 rounded-lg ${message.role === 'assistant' ? 'bg-gray-50' : ''}}>
      {message.content}
    </div>
  );
};

export default function MastraChatUI() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I can help you manage your employees. Try saying "Add Sarah Johnson, $28/hour, 22 hours/week, Mon-Fri, start Sep 28"'
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    if (input.toLowerCase().includes('add')) {
      const name = input.match(/add ([\w\s]+),/)?.[1] || 'Unknown';
      const payRate = parseInt(input.match(/\$(\d+)/)?.[1] || '0');
      const hours = parseInt(input.match(/(\d+)\s*hours?/)?.[1] || '0');
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      
      const aiResponse: Message = {
        role: 'assistant',
        action: 'render_employee_form',
        content: 'Here\'s a summary of the new employee. Please review and confirm.',
        data: {
          name,
          payRate,
          hoursPerWeek: hours,
          availability: days,
          startDate: new Date('2025-09-28')
        }
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'I understand you want to ' + input + '. However, I can only help with adding new employees right now.'
        }]);
      }, 1000);
    }

    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <MessageContent key={i} message={msg} />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add an employee or ask for help..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button type="submit">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
    }
  ]);
  const scrollerRef = useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs]);

  useEffect(() => {
    const onWorkflowComplete = (result: { employee?: { id: string; firstName: string; lastName: string; hoursPerWeek: number; payRate: number } }) => {
      if (result.employee) {
        businessMetrics.setMetrics({
          totalEmployees: businessMetrics.totalEmployees + 1,
          totalHours: businessMetrics.totalHours + result.employee.hoursPerWeek,
          totalPayroll: businessMetrics.totalPayroll + (result.employee.payRate * result.employee.hoursPerWeek)
        });
      }
    };

    workflow.on('workflowComplete', onWorkflowComplete);
    return () => {
      workflow.off('workflowComplete', onWorkflowComplete);
    };
  }, [businessMetrics]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role:'user', content: input.trim() };
    setMsgs(m => [...m, userMsg]);
    setInput('');

    try {
      const assistantMsg: Msg = { 
        role: 'assistant', 
        content: 'Processing your request through Cedar OS...' 
      };
      setMsgs(m => [...m, assistantMsg]);

      // Execute workflow
      const result = await workflow.execute('processEmployeeRequest', {
        input,
        businessMetrics
      });

      // Show workflow result
      const workflowMsg: Msg = {
        role: 'tool',
        content: JSON.stringify(result, null, 2)
      };
      setMsgs(m => [...m, workflowMsg]);

      // Update business metrics
      if (result.employee) {
        businessMetrics.setMetrics({
          totalEmployees: businessMetrics.totalEmployees + 1,
          totalHours: businessMetrics.totalHours + result.employee.hoursPerWeek,
          totalPayroll: businessMetrics.totalPayroll + (result.employee.payRate * result.employee.hoursPerWeek)
        });

        // Update calendar
        window.dispatchEvent(new CustomEvent('cedar:schedule', { 
          detail: {
            plan: [{
              date: new Date().toISOString().slice(0,10),
              morning: [{ 
                id: result.employee.id, 
                name: ${result.employee.firstName} ${result.employee.lastName} 
              }]
            }]
          }
        }));

        // Success message
        setMsgs(m => [...m, { 
          role: 'assistant', 
          content: Successfully added ${result.employee.firstName} ${result.employee.lastName} to the system! 
        }]);
      }
    } catch (error) {
      console.error('Cedar OS workflow error:', error);
      setMsgs(m => [...m, { 
        role: 'assistant', 
        content: 'There was an error processing your request. Please try again.' 
      }]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollerRef} className="flex-1 overflow-y-auto space-y-2">
        {msgs.map((m, i) => {
          if (m.role === 'employee') {
            return (
              <div key={i} className="bg-green-50 text-green-900 border border-green-200 rounded-xl px-3 py-2 text-sm">
                <h3 className="font-semibold">New Employee Added</h3>
                <div className="mt-2">
                  <p>Name: {m.data.firstName} {m.data.lastName}</p>
                  <p>Email: {m.data.email}</p>
                  <p>Rate: ${m.data.payRate}/hr</p>
                  <p>Hours: {m.data.hoursPerWeek}hrs/week</p>
                  <div className="mt-2 border-t border-green-200 pt-2">
                    <p>Schedule:</p>
                    <p>Start Date: {m.data.schedule.startDate}</p>
                    <p>Time: {m.data.schedule.startTime} - {m.data.schedule.endTime}</p>
                    <p>Days: {m.data.schedule.days.join(', ')}</p>
                  </div>
                </div>
              </div>
            );
          }
          
          if (m.role === 'schedule') {
            return (
              <div key={i} className="bg-blue-50 text-blue-900 border border-blue-200 rounded-xl px-3 py-2 text-sm">
                <h3 className="font-semibold">Schedule for {m.data.date}</h3>
                <div className="mt-2">
                  <div>
                    <p className="font-medium">Morning Shift (8am-2pm):</p>
                    {m.data.morning.map((emp: { id: string; name: string }) => (
                      <p key={emp.id}>{emp.name}</p>
                    ))}
                  </div>
                  <div className="mt-2">
                    <p className="font-medium">Evening Shift (2pm-8pm):</p>
                    {m.data.evening.map((emp: { id: string; name: string }) => (
                      <p key={emp.id}>{emp.name}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={i} className={`rounded-xl px-3 py-2 text-sm max-w-[85%]
              ${m.role==='user' ? 'ml-auto bg-blue-600 text-white' :
                 m.role==='tool' ? 'bg-indigo-50 text-indigo-900 border border-indigo-200' :
                 'bg-white text-gray-900 border border-gray-200'}`}>
              <pre className="whitespace-pre-wrap">{m.content}</pre>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key==='Enter' && send()}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder='e.g. "Schedule next week" or "Add Sarah Johnson, $28/hr, 22h, Mon–Fri"'
        />
        <button onClick={send}
          className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 hover:opacity-90">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
