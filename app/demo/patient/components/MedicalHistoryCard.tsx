"use client"

import { motion } from 'framer-motion';
import { FileCheck, Clock, Hospital, User, CalendarCheck } from 'lucide-react';

interface MedicalCondition {
  condition: string;
  date: string;
  status: string;
  notes: string;
  doctor: string;
  hospital: string;
  followUp: string;
}

interface MedicalHistoryCardProps {
  medicalHistory: MedicalCondition[];
}

export default function MedicalHistoryCard({ medicalHistory }: MedicalHistoryCardProps) {
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
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <FileCheck className="w-6 h-6 text-green-500 mr-2" />
        Medical History
      </h3>

      <div className="space-y-6">
        {medicalHistory.map((condition, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="border-l-4 border-green-500 pl-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-800">
                {condition.condition}
              </h4>
              <span className={`px-3 py-1 rounded-full text-sm ${
                condition.status === 'Ongoing' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {condition.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>Diagnosed: {new Date(condition.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Hospital className="w-4 h-4 mr-2" />
                <span>{condition.hospital}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <User className="w-4 h-4 mr-2" />
                <span>{condition.doctor}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CalendarCheck className="w-4 h-4 mr-2" />
                <span>Follow-up: {
                  condition.followUp === 'Completed' 
                    ? 'Completed' 
                    : new Date(condition.followUp).toLocaleDateString()
                }</span>
              </div>
            </div>

            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
              {condition.notes}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
