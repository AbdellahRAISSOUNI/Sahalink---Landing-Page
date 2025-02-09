"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'appointment' | 'medication' | 'result' | 'general';
}

interface NotificationPanelProps {
  show: boolean;
  onClose: () => void;
  notifications: Notification[];
  onNotificationRead: (id: number) => void;
}

export default function NotificationPanel({
  show,
  onClose,
  notifications,
  onNotificationRead
}: NotificationPanelProps) {
  if (!show) return null;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-50 border-blue-200';
      case 'medication':
        return 'bg-green-50 border-green-200';
      case 'result':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50"
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="overflow-y-auto h-[calc(100%-4rem)]">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No notifications
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg border ${getNotificationColor(notification.type)} ${
                  !notification.read ? 'border-l-4' : ''
                }`}
                onClick={() => onNotificationRead(notification.id)}
              >
                <h3 className="font-medium text-gray-900">{notification.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <span className="text-xs text-gray-500 mt-2 block">{notification.time}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
