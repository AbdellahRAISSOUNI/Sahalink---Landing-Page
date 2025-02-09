"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Calendar, Clock, Pill, 
  Stethoscope, Weight, Ruler, Award,
  Heart, User, Star, TrendingUp
} from 'lucide-react';

interface QuickStatsCardProps {
  stats: {
    appointments: number;
    prescriptions: number;
    checkups: number;
    streak: number;
    bmi: number;
    healthScore: number;
    adherence: number;
    progress: number;
  };
}

export default function QuickStatsCard({ stats }: QuickStatsCardProps) {
  const statItems = [
    {
      icon: Calendar,
      label: 'Appointments',
      value: stats.appointments,
      unit: 'upcoming',
      color: 'bg-blue-500',
      gradient: 'from-blue-500/20 to-blue-500/5'
    },
    {
      icon: Pill,
      label: 'Prescriptions',
      value: stats.prescriptions,
      unit: 'active',
      color: 'bg-purple-500',
      gradient: 'from-purple-500/20 to-purple-500/5'
    },
    {
      icon: Stethoscope,
      label: 'Checkups',
      value: stats.checkups,
      unit: 'this year',
      color: 'bg-green-500',
      gradient: 'from-green-500/20 to-green-500/5'
    },
    {
      icon: Award,
      label: 'Streak',
      value: stats.streak,
      unit: 'days',
      color: 'bg-yellow-500',
      gradient: 'from-yellow-500/20 to-yellow-500/5'
    },
    {
      icon: Weight,
      label: 'BMI',
      value: stats.bmi,
      unit: 'kg/m²',
      color: 'bg-red-500',
      gradient: 'from-red-500/20 to-red-500/5'
    },
    {
      icon: Star,
      label: 'Health Score',
      value: stats.healthScore,
      unit: '/100',
      color: 'bg-indigo-500',
      gradient: 'from-indigo-500/20 to-indigo-500/5'
    },
    {
      icon: TrendingUp,
      label: 'Adherence',
      value: stats.adherence,
      unit: '%',
      color: 'bg-teal-500',
      gradient: 'from-teal-500/20 to-teal-500/5'
    },
    {
      icon: Activity,
      label: 'Progress',
      value: stats.progress,
      unit: '%',
      color: 'bg-pink-500',
      gradient: 'from-pink-500/20 to-pink-500/5'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-xl"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <User className="w-6 h-6 text-blue-500 mr-2" />
        Quick Stats
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} p-4`}
          >
            <div className="flex items-start justify-between">
              <div className={`p-2 rounded-lg ${item.color.replace('bg-', 'bg-opacity-10 text-')}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="absolute -right-4 -top-4 w-16 h-16 opacity-10"
              >
                <item.icon className="w-full h-full" />
              </motion.div>
            </div>
            <div className="mt-3">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.1 }}
                className="text-2xl font-bold text-gray-800"
              >
                {item.value}
              </motion.span>
              <span className="text-sm text-gray-500 ml-1">{item.unit}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
