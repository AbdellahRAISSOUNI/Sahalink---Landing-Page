"use client"

import { motion } from 'framer-motion';
import { Pill, Clock, User, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react';

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  prescribedBy: string;
  purpose: string;
  sideEffects: string;
  instructions: string;
  refills: number;
}

interface MedicationsCardProps {
  medications: Medication[];
  onRequestRefill: (medication: string) => void;
}

export default function MedicationsCard({ medications, onRequestRefill }: MedicationsCardProps) {
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
        <Pill className="w-6 h-6 text-green-500 mr-2" />
        Current Medications
      </h3>

      <div className="space-y-6">
        {medications.map((medication, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-gray-800 flex items-center">
                  {medication.name}
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {medication.dosage}
                  </span>
                </h4>
                <span className="text-sm text-gray-500">{medication.purpose}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                medication.endDate === 'Ongoing' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {medication.endDate === 'Ongoing' ? 'Active' : 'Completed'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                <span>{medication.frequency}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <User className="w-4 h-4 mr-2 text-gray-400" />
                <span>{medication.prescribedBy}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CheckCircle className="w-4 h-4 mr-2 text-gray-400" />
                <span>Started: {new Date(medication.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <RefreshCw className="w-4 h-4 mr-2 text-gray-400" />
                <span>{medication.refills} refills remaining</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 text-orange-500 mr-2 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Instructions:</p>
                  <p className="text-sm text-gray-600">{medication.instructions}</p>
                </div>
              </div>
            </div>

            {medication.sideEffects && (
              <div className="text-sm text-gray-500 mb-4">
                <span className="font-medium">Side Effects:</span> {medication.sideEffects}
              </div>
            )}

            {medication.endDate === 'Ongoing' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onRequestRefill(medication.name)}
                className="w-full py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Request Refill
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
