"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  QrCode,
  AlertTriangle,
  Share2,
  Download,
  Printer,
  FileText,
  Calendar,
  Clock,
  Bell,
  Settings,
  ChevronRight,
  Stethoscope,
  Pill,
  FileCheck,
  Activity
} from "lucide-react";

interface ActionBarProps {
  onGenerateQR: () => void;
  onEmergency: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ onGenerateQR, onEmergency }) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    // Set initial time
    setCurrentTime(new Date().toLocaleTimeString());
    
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const primaryActions = [
    { 
      icon: QrCode, 
      label: "QR Code", 
      onClick: onGenerateQR, 
      color: "blue",
      description: "Generate patient QR code" 
    },
    { 
      icon: AlertTriangle, 
      label: "Emergency", 
      onClick: onEmergency, 
      color: "red",
      description: "Notify emergency contacts" 
    },
    { 
      icon: Calendar, 
      label: "Schedule", 
      onClick: () => {}, 
      color: "purple",
      description: "View appointments" 
    },
    { 
      icon: Stethoscope, 
      label: "Checkup", 
      onClick: () => {}, 
      color: "green",
      description: "Request checkup" 
    },
  ];

  const quickStats = [
    { icon: Activity, label: "Heart Rate", value: "72 bpm", trend: "+2" },
    { icon: Pill, label: "Medications", value: "2 today", trend: "on track" },
    { icon: FileCheck, label: "Last Visit", value: "3 days ago", trend: "" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-b border-gray-100">
        {quickStats.map((stat, index) => (
          <div
            key={stat.label}
            className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="rounded-full p-2 bg-white">
              <stat.icon className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="font-semibold text-gray-900">{stat.value}</p>
              {stat.trend && (
                <p className="text-xs text-green-600">{stat.trend}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Actions Section */}
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {primaryActions.map((action) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.onClick}
              className={`flex flex-col items-center justify-center p-4 rounded-xl bg-${action.color}-50 hover:bg-${action.color}-100 transition-colors group relative`}
            >
              <div className={`rounded-full p-3 bg-${action.color}-100 group-hover:bg-${action.color}-200 mb-2`}>
                <action.icon className={`w-6 h-6 text-${action.color}-600`} />
              </div>
              <span className={`font-medium text-${action.color}-700`}>
                {action.label}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                {action.description}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Secondary Actions */}
        <div className="mt-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4 text-gray-500">
            <button className="hover:text-gray-700 flex items-center space-x-1">
              <FileText className="w-4 h-4" />
              <span>Documents</span>
            </button>
            <button className="hover:text-gray-700 flex items-center space-x-1">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="hover:text-gray-700 flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{currentTime ? `Last updated: ${currentTime}` : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
