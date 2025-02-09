"use client"

import { motion } from 'framer-motion';
import { Bell, Settings, LogOut, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  unreadNotifications: number;
  onNotificationClick: () => void;
  onSettingsClick: () => void;
  onLogout: () => void;
}

export default function Header({ 
  unreadNotifications, 
  onNotificationClick, 
  onSettingsClick, 
  onLogout 
}: HeaderProps) {
  const router = useRouter();

  return (
    <motion.header 
      className="bg-white/80 backdrop-blur-sm shadow-md p-4 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center px-4 py-2 rounded-full bg-white/50 hover:bg-white/80 shadow-sm transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2 text-gray-600 group-hover:text-green-600 transition-colors" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-green-600 transition-colors">Back</span>
          </motion.button>
          <Image
            src="/logo.png"
            alt="WaslMed Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNotificationClick}
            className="p-2 hover:bg-white/80 rounded-full relative"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                {unreadNotifications}
              </span>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSettingsClick}
            className="p-2 hover:bg-white/80 rounded-full"
          >
            <Settings className="w-6 h-6 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
