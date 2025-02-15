"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, Plus, X } from 'lucide-react';

export default function ScheduleContent() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [appointments] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      time: '09:00',
      type: 'Regular Checkup',
      duration: '30min',
      status: 'Confirmed',
      notes: 'Follow-up on blood pressure medication',
      phone: '+212 6XX-XXXXXX'
    },
    {
      id: 2,
      patientName: 'Mohammed Ahmed',
      time: '10:00',
      type: 'Follow-up',
      duration: '45min',
      status: 'Confirmed',
      notes: 'Post-surgery check',
      phone: '+212 6XX-XXXXXX'
    },
    {
      id: 3,
      patientName: 'Fatima El Amrani',
      time: '11:30',
      type: 'New Patient',
      duration: '60min',
      status: 'Pending',
      notes: 'Initial consultation - chronic back pain',
      phone: '+212 6XX-XXXXXX'
    },
    {
      id: 4,
      patientName: 'Youssef Benali',
      time: '13:30',
      type: 'Lab Results',
      duration: '30min',
      status: 'Confirmed',
      notes: 'Review blood work results',
      phone: '+212 6XX-XXXXXX'
    },
    {
      id: 5,
      patientName: 'Amina Tazi',
      time: '14:30',
      type: 'Emergency',
      duration: '45min',
      status: 'Confirmed',
      notes: 'Severe migraine - urgent care needed',
      phone: '+212 6XX-XXXXXX'
    },
    {
      id: 6,
      patientName: 'Hassan Mansouri',
      time: '16:00',
      type: 'Telemedicine',
      duration: '30min',
      status: 'Scheduled',
      notes: 'Virtual follow-up consultation',
      phone: '+212 6XX-XXXXXX'
    }
  ]);

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = 8 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'emergency':
        return <span className="text-red-500">🚨</span>;
      case 'telemedicine':
        return <span>💻</span>;
      case 'new patient':
        return <span>👤</span>;
      case 'lab results':
        return <span>🔬</span>;
      default:
        return <span>📋</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Schedule</h2>
        <button
          onClick={() => setShowNewAppointment(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <Plus size={20} />
          New Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Calendar</h3>
            <CalendarIcon size={20} className="text-gray-500" />
          </div>
          <div className="text-center mb-4">
            <h4 className="text-lg font-medium">
              {selectedDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
            </h4>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i - selectedDate.getDay() + 1);
              const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              const hasAppointments = appointments.some(apt => new Date(apt.date).toDateString() === date.toDateString());

              return (
                <div
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={`
                    text-center p-2 cursor-pointer rounded-full
                    ${isCurrentMonth ? 'hover:bg-blue-50' : 'text-gray-300'}
                    ${isToday ? 'bg-blue-500 text-white' : ''}
                    ${hasAppointments && !isToday ? 'border-2 border-blue-200' : ''}
                  `}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Today's Schedule</h3>
            <div className="text-sm text-gray-500">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          <div className="space-y-4">
            {timeSlots.map(time => {
              const appointment = appointments.find(apt => apt.time === time);
              return (
                <div key={time} className="flex items-start gap-4">
                  <div className="w-20 text-sm text-gray-500">{time}</div>
                  {appointment ? (
                    <div className="flex-1 bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(appointment.type)}
                          <span className="font-medium">{appointment.patientName}</span>
                          <span className={`px-2 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock size={16} />
                            <span>{appointment.duration}</span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-800">
                            <User size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Type:</span> {appointment.type}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Notes:</span> {appointment.notes}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Phone:</span> {appointment.phone}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 border border-dashed border-gray-200 rounded-lg p-3 text-center text-gray-400 hover:bg-gray-50 cursor-pointer">
                      Available
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showNewAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">New Appointment</h3>
              <button onClick={() => setShowNewAppointment(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Regular Checkup</option>
                  <option>New Patient</option>
                  <option>Follow-up</option>
                  <option>Emergency</option>
                  <option>Lab Results</option>
                  <option>Telemedicine</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>30min</option>
                  <option>45min</option>
                  <option>60min</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" rows={3}></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewAppointment(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
