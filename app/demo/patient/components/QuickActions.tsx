"use client"

import { motion } from 'framer-motion';
import { FileText, Calendar, Printer, Share2 } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export default function QuickActions({ onActionClick }: QuickActionsProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
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

  const actions = [
    { icon: FileText, label: 'Medical Records', action: 'records' },
    { icon: Calendar, label: 'Book Appointment', action: 'booking' },
    { icon: Printer, label: 'Print Summary', action: 'print' },
    { icon: Share2, label: 'Share Records', action: 'share' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
    >
      {actions.map((item, index) => (
        <motion.button
          key={index}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onActionClick(item.action)}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
        >
          <item.icon className="w-6 h-6 text-green-600 mb-2" />
          <span className="text-sm font-medium text-gray-700">{item.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
