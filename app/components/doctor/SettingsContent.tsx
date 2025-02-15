"use client"

import { motion } from 'framer-motion';
import { 
  Bell, Moon, Globe, Clock, Shield, Mail, Phone, Printer, 
  Smartphone, Volume2, Monitor, Key, Users, FileText, 
  Calendar, Database, AlertTriangle, Sliders, Palette, Wifi
} from 'lucide-react';
import { useState } from 'react';

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    notifications: true,
    darkMode: false,
    language: 'English',
    timeZone: 'UTC+1',
    soundEffects: true,
    highContrast: false,
    compactView: false,
    autoSave: true,
    
    // Security Settings
    twoFactorAuth: false,
    biometricLogin: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginAttempts: '3',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    labResultsNotifications: true,
    emergencyAlerts: true,
    
    // Preferences
    defaultCalendarView: 'week',
    recordsPerPage: '10',
    prescriptionFormat: 'detailed',
    reportFormat: 'pdf',
    consultationDuration: '30',
    currency: 'MAD',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    
    // System Settings
    autoBackup: true,
    dataRetention: '365',
    printMode: 'color',
    networkPreference: 'auto',
    deviceSync: true
  });

  const handleToggle = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }));
  };

  const handleChange = (setting: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value,
    }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Sliders },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Users },
    { id: 'system', label: 'System', icon: Monitor },
  ];

  const renderToggleSetting = (icon: any, title: string, description: string, setting: string) => (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <h3 className="font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => handleToggle(setting)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
          settings[setting as keyof typeof settings] ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            settings[setting as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </motion.button>
    </div>
  );

  const renderSelectSetting = (icon: any, title: string, description: string, setting: string, options: { value: string, label: string }[]) => (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <h3 className="font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <select
        className="form-select rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        value={settings[setting as keyof typeof settings]}
        onChange={(e) => handleChange(setting, e.target.value)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-6 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <p className="text-gray-500 mt-1">Customize your workspace preferences</p>
        </div>
        <button
          onClick={() => {/* Save settings */}}
          className="w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <motion.span
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save Changes
          </motion.span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="border-b border-gray-100">
          <div className="overflow-x-auto">
            <div className="flex space-x-1 md:space-x-8 p-4 min-w-max">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-4"
              >
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Display Settings</h3>
                  <div className="space-y-4">
                    {renderToggleSetting(<Moon className="w-5 h-5 text-blue-600" />, "Dark Mode", "Switch to dark theme", "darkMode")}
                    {renderToggleSetting(<Palette className="w-5 h-5 text-purple-600" />, "High Contrast", "Increase visual contrast for better accessibility", "highContrast")}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Localization</h3>
                  <div className="space-y-4">
                    {renderSelectSetting(<Globe className="w-5 h-5 text-green-600" />, "Language", "Select your preferred language", "language", [
                      { value: 'English', label: 'English' },
                      { value: 'French', label: 'French' },
                      { value: 'Arabic', label: 'Arabic' }
                    ])}
                    {renderSelectSetting(<Clock className="w-5 h-5 text-orange-600" />, "Time Zone", "Set your time zone", "timeZone", [
                      { value: 'UTC+1', label: 'UTC+1' },
                      { value: 'UTC+2', label: 'UTC+2' },
                      { value: 'UTC+3', label: 'UTC+3' }
                    ])}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
                  <div className="space-y-4">
                    {renderToggleSetting(<Bell className="w-5 h-5 text-blue-600" />, "Notifications", "Receive notifications about appointments and messages", "notifications")}
                    {renderToggleSetting(<Volume2 className="w-5 h-5 text-purple-600" />, "Sound Effects", "Enable sound effects for notifications", "soundEffects")}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-4"
              >
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Authentication</h3>
                  <div className="space-y-4">
                    {renderToggleSetting(<Key className="w-5 h-5 text-orange-600" />, "Two-Factor Authentication", "Add an extra layer of security to your account", "twoFactorAuth")}
                    {renderToggleSetting(<Smartphone className="w-5 h-5 text-green-600" />, "Biometric Login", "Enable fingerprint or face recognition login", "biometricLogin")}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    {renderSelectSetting(<Clock className="w-5 h-5 text-purple-600" />, "Session Timeout", "Set session timeout duration (minutes)", "sessionTimeout", [
                      { value: '15', label: '15 minutes' },
                      { value: '30', label: '30 minutes' },
                      { value: '60', label: '1 hour' }
                    ])}
                    {renderSelectSetting(<AlertTriangle className="w-5 h-5 text-red-600" />, "Login Attempts", "Maximum failed login attempts before lockout", "loginAttempts", [
                      { value: '3', label: '3 attempts' },
                      { value: '5', label: '5 attempts' },
                      { value: '10', label: '10 attempts' }
                    ])}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-4"
              >
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Communication Channels</h3>
                  <div className="space-y-4">
                    {renderToggleSetting(<Mail className="w-5 h-5 text-blue-600" />, "Email Notifications", "Receive notifications via email", "emailNotifications")}
                    {renderToggleSetting(<Phone className="w-5 h-5 text-green-600" />, "SMS Notifications", "Receive notifications via SMS", "smsNotifications")}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Alerts</h3>
                  <div className="space-y-4">
                    {renderToggleSetting(<Calendar className="w-5 h-5 text-purple-600" />, "Appointment Reminders", "Get reminders for upcoming appointments", "appointmentReminders")}
                    {renderToggleSetting(<FileText className="w-5 h-5 text-orange-600" />, "Lab Results", "Get notified when new lab results are available", "labResultsNotifications")}
                    {renderToggleSetting(<AlertTriangle className="w-5 h-5 text-red-600" />, "Emergency Alerts", "Receive emergency and urgent care alerts", "emergencyAlerts")}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'preferences' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-4"
              >
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Display Preferences</h3>
                  <div className="space-y-4">
                    {renderSelectSetting(<Calendar className="w-5 h-5 text-blue-600" />, "Default Calendar View", "Set default calendar view", "defaultCalendarView", [
                      { value: 'day', label: 'Day' },
                      { value: 'week', label: 'Week' },
                      { value: 'month', label: 'Month' }
                    ])}
                    {renderSelectSetting(<FileText className="w-5 h-5 text-purple-600" />, "Records Per Page", "Number of records to show per page", "recordsPerPage", [
                      { value: '10', label: '10 records' },
                      { value: '25', label: '25 records' },
                      { value: '50', label: '50 records' }
                    ])}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Time & Format</h3>
                  <div className="space-y-4">
                    {renderSelectSetting(<Clock className="w-5 h-5 text-green-600" />, "Consultation Duration", "Default consultation duration", "consultationDuration", [
                      { value: '15', label: '15 minutes' },
                      { value: '30', label: '30 minutes' },
                      { value: '45', label: '45 minutes' }
                    ])}
                    {renderSelectSetting(<Globe className="w-5 h-5 text-orange-600" />, "Date Format", "Set your preferred date format", "dateFormat", [
                      { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                      { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                      { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
                    ])}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'system' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-4"
              >
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Management</h3>
                  <div className="space-y-4">
                    {renderToggleSetting(<Database className="w-5 h-5 text-blue-600" />, "Auto Backup", "Automatically backup your data", "autoBackup")}
                    {renderSelectSetting(<Clock className="w-5 h-5 text-purple-600" />, "Data Retention", "Set how long to keep historical data", "dataRetention", [
                      { value: '180', label: '6 months' },
                      { value: '365', label: '1 year' },
                      { value: '730', label: '2 years' }
                    ])}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">System Preferences</h3>
                  <div className="space-y-4">
                    {renderSelectSetting(<Printer className="w-5 h-5 text-green-600" />, "Print Mode", "Default printing mode", "printMode", [
                      { value: 'color', label: 'Color' },
                      { value: 'grayscale', label: 'Grayscale' },
                      { value: 'blackwhite', label: 'Black & White' }
                    ])}
                    {renderToggleSetting(<Wifi className="w-5 h-5 text-orange-600" />, "Device Sync", "Sync settings across devices", "deviceSync")}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
