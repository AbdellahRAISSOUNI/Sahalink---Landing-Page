"use client"

import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, Clock } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsContent() {
  const patientData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Patient Visits',
      data: [65, 59, 80, 81, 56, 75, 82, 90, 85, 70, 88, 95],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Revenue (MAD)',
      data: [45000, 52000, 60000, 58000, 65000, 70000, 75000, 80000, 85000, 90000, 88000, 95000],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }]
  };

  const patientTypeData = {
    labels: ['New Patients', 'Regular Patients', 'Referrals', 'Emergency', 'Telemedicine'],
    datasets: [{
      data: [25, 40, 15, 10, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    }]
  };

  const appointmentData = {
    labels: ['Completed', 'Scheduled', 'Cancelled', 'No-show'],
    datasets: [{
      data: [75, 15, 5, 5],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    }]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Patients</p>
              <h4 className="text-2xl font-bold">1,234</h4>
              <p className="text-sm text-green-500">+12% from last month</p>
            </div>
            <Users className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Monthly Revenue</p>
              <h4 className="text-2xl font-bold">95,000 MAD</h4>
              <p className="text-sm text-green-500">+8% from last month</p>
            </div>
            <TrendingUp className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Appointments Today</p>
              <h4 className="text-2xl font-bold">28</h4>
              <p className="text-sm text-blue-500">4 remaining</p>
            </div>
            <Calendar className="text-purple-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Avg. Consultation Time</p>
              <h4 className="text-2xl font-bold">25 min</h4>
              <p className="text-sm text-yellow-500">-2 min from avg</p>
            </div>
            <Clock className="text-yellow-500" size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Patient Visits (2025)</h3>
          <Bar data={patientData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview (2025)</h3>
          <Line data={revenueData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Patient Distribution</h3>
          <Doughnut data={patientTypeData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Appointment Status</h3>
          <Doughnut data={appointmentData} options={{ responsive: true }} />
        </div>
      </div>
    </motion.div>
  );
}
