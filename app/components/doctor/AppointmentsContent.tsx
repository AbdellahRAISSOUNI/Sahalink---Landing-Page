"use client"

import { motion } from 'framer-motion';
import { Calendar, Clock, User, Video } from 'lucide-react';

const appointmentsData = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    date: "2025-02-15",
    time: "10:00 AM",
    type: "In-Person",
    reason: "Follow-up Consultation",
    status: "Scheduled"
  },
  {
    id: 2,
    patientName: "Mohammed Ahmed",
    date: "2025-02-20",
    time: "2:30 PM",
    type: "Video Call",
    reason: "Diabetes Check",
    status: "Scheduled"
  },
  {
    id: 3,
    patientName: "Fatima El Amrani",
    date: "2025-03-01",
    time: "11:15 AM",
    type: "In-Person",
    reason: "Asthma Follow-up",
    status: "Scheduled"
  }
];

export default function AppointmentsContent() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
            </div>
            <div className="space-y-4">
              {appointmentsData.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  whileHover={{ scale: 1.01 }}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-50 rounded-full">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{appointment.patientName}</h3>
                        <p className="text-sm text-gray-500">{appointment.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{appointment.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {appointment.type === "Video Call" ? (
                        <Video className="w-4 h-4 text-green-500" />
                      ) : (
                        <User className="w-4 h-4 text-blue-500" />
                      )}
                      <span className="text-sm text-gray-600">{appointment.type}</span>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {appointment.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              New Appointment
            </button>
            <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              View Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
