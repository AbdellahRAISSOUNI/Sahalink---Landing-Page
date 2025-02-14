"use client"

import { motion } from 'framer-motion';
import { Bell, Moon, Globe, Clock } from 'lucide-react';
import { useState } from 'react';

export default function SettingsContent() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'English',
    timeZone: 'UTC+1',
  });

  const handleToggle = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 space-y-6">
          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-800">Notifications</h3>
                <p className="text-sm text-gray-500">Receive notifications about appointments and messages</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => handleToggle('notifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.notifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </motion.button>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-800">Dark Mode</h3>
                <p className="text-sm text-gray-500">Switch to dark theme</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => handleToggle('darkMode')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </motion.button>
          </div>

          {/* Language */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-800">Language</h3>
                <p className="text-sm text-gray-500">Select your preferred language</p>
              </div>
            </div>
            <select
              className="form-select rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              value={settings.language}
              onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
            >
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>

          {/* Time Zone */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-800">Time Zone</h3>
                <p className="text-sm text-gray-500">Set your local time zone</p>
              </div>
            </div>
            <select
              className="form-select rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              value={settings.timeZone}
              onChange={(e) => setSettings(prev => ({ ...prev, timeZone: e.target.value }))}
            >
              <option value="UTC+0">UTC+0</option>
              <option value="UTC+1">UTC+1</option>
              <option value="UTC+2">UTC+2</option>
              <option value="UTC+3">UTC+3</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
