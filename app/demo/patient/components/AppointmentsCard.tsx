"use client"

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, FileText, Check, X } from 'lucide-react';

interface Appointment {
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  purpose: string;
  status: string;
}

interface AppointmentsCardProps {
  appointments: Appointment[];
  onBookAppointment: () => void;
}

export default function AppointmentsCard({ appointments, onBookAppointment }: AppointmentsCardProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Calendar className="w-6 h-6 text-green-500 mr-2" />
          Upcoming Appointments
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBookAppointment}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Book New
        </motion.button>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-800">{appointment.doctor}</h4>
                <span className="text-sm text-gray-500">{appointment.specialty}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                appointment.status === 'Confirmed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {appointment.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                <span>{new Date(appointment.date).toLocaleDateString()} {appointment.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span>{appointment.location}</span>
              </div>
              <div className="flex items-center text-gray-600 col-span-2">
                <FileText className="w-4 h-4 mr-2 text-gray-400" />
                <span>{appointment.purpose}</span>
              </div>
            </div>

            <div className="mt-4 flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center"
              >
                <Check className="w-4 h-4 mr-2" />
                Confirm
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
