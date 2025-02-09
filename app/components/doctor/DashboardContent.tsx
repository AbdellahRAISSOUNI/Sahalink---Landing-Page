"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Clock, ChartBar, TrendingUp, Activity, Heart, Stethoscope, User } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const patientVisitsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Patient Visits',
      data: [65, 59, 80, 81, 56, 75],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const currentPatients = [
  {
    id: 1,
    name: "Sarah Johnson",
    time: "10:00 AM",
    status: "In Consultation",
    type: "Regular Checkup"
  },
  {
    id: 2,
    name: "Mohammed Ahmed",
    time: "10:30 AM",
    status: "Waiting",
    type: "Follow-up"
  },
  {
    id: 3,
    name: "Fatima El Amrani",
    time: "11:00 AM",
    status: "Scheduled",
    type: "Lab Results Review"
  }
];

const specialtyStats = [
  { name: "General Checkup", count: 45, color: "bg-blue-100 text-blue-600" },
  { name: "Cardiology", count: 28, color: "bg-red-100 text-red-600" },
  { name: "Pediatrics", count: 32, color: "bg-green-100 text-green-600" },
  { name: "Orthopedics", count: 19, color: "bg-purple-100 text-purple-600" }
];

export default function DashboardContent() {
  const [activePatients] = useState(12);
  const [todayAppointments] = useState(8);
  const [completedAppointments] = useState(45);
  const [satisfaction] = useState(4.8);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Patients</p>
              <h3 className="text-2xl font-bold text-gray-800">{activePatients}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Appointments</p>
              <h3 className="text-2xl font-bold text-gray-800">{todayAppointments}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Sessions</p>
              <h3 className="text-2xl font-bold text-gray-800">{completedAppointments}</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Patient Satisfaction</p>
              <h3 className="text-2xl font-bold text-gray-800">{satisfaction}/5.0</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <ChartBar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Current Patients and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Patient Visits Trend</h2>
            <Line data={patientVisitsData} options={{ responsive: true }} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Current Patients</h2>
          <div className="space-y-4">
            {currentPatients.map((patient) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg border hover:bg-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-full">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium">{patient.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{patient.time}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{patient.type}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    patient.status === 'In Consultation' ? 'bg-green-100 text-green-800' :
                    patient.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {patient.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Specialty Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Appointments by Specialty</h2>
          <div className="grid grid-cols-2 gap-4">
            {specialtyStats.map((specialty, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-lg border"
              >
                <div className={`w-10 h-10 ${specialty.color} rounded-full flex items-center justify-center mb-2`}>
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="font-medium">{specialty.name}</h3>
                <p className="text-2xl font-bold">{specialty.count}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Average Wait Time</span>
              </div>
              <p className="text-2xl font-bold">15 min</p>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-5 h-5 text-red-600" />
                <span className="font-medium">Critical Cases</span>
              </div>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-medium">Recovery Rate</span>
              </div>
              <p className="text-2xl font-bold">92%</p>
            </div>
            <div className="p-4 rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="font-medium">New Patients</span>
              </div>
              <p className="text-2xl font-bold">+8</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
