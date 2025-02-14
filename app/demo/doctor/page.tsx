"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Clock, ChartBar, Bell, Settings, LogOut, Search, User, FileText, QrCode, X, BarChart, FileCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DemoHeader from '../components/DemoHeader';
import dynamic from 'next/dynamic';
import { Html5QrcodeScanner } from 'html5-qrcode';
import DashboardContent from '@/app/components/doctor/DashboardContent';
import AppointmentsContent from '@/app/components/doctor/AppointmentsContent';
import PatientsContent from '@/app/components/doctor/PatientsContent';
import DocumentsContent from '@/app/components/doctor/DocumentsContent';
import SettingsContent from '@/app/components/doctor/SettingsContent';
import AnalyticsContent from '@/app/components/doctor/AnalyticsContent';
import MedicalRecordsContent from '@/app/components/doctor/MedicalRecordsContent';
import ScheduleContent from '@/app/components/doctor/ScheduleContent';

export default function DoctorDemoPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [activePatient, setActivePatient] = useState(null);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Check login state on mount
  useEffect(() => {
    const savedLoginState = localStorage.getItem('doctorLoginState');
    if (savedLoginState) {
      const { isLoggedIn: savedIsLoggedIn, username: savedUsername } = JSON.parse(savedLoginState);
      setIsLoggedIn(savedIsLoggedIn);
      setUsername(savedUsername);
    }
  }, []);

  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Patient Registration', message: 'A new patient has registered for consultation', time: '5m ago' },
    { id: 2, title: 'Appointment Reminder', message: 'You have an appointment in 30 minutes', time: '30m ago' },
    { id: 3, title: 'Lab Results Available', message: 'New lab results are ready for review', time: '1h ago' },
  ]);

  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'English',
    timeZone: 'UTC+1',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
      // Save login state
      localStorage.setItem('doctorLoginState', JSON.stringify({ isLoggedIn: true, username }));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('doctorLoginState');
  };

  // QR Scanner setup
  const startQRScanner = () => {
    setShowQRScanner(true);
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );
    
    html5QrcodeScanner.render((decodedText: string) => {
      try {
        const patientData = JSON.parse(decodedText);
        setActivePatient(patientData);
        setShowPatientDetails(true);
        setShowQRScanner(false);
        html5QrcodeScanner.clear();
      } catch (error) {
        console.error('Invalid QR code data:', error);
        alert('Invalid QR code format');
        setShowQRScanner(false);
        html5QrcodeScanner.clear();
      }
    }, (error: any) => {
      console.error(error);
    });
  };

  const menuItems = [
    { id: 'Dashboard', icon: ChartBar, label: 'Dashboard' },
    { id: 'Analytics', icon: BarChart, label: 'Analytics' },
    { id: 'Schedule', icon: Calendar, label: 'Schedule' },
    { id: 'Patients', icon: Users, label: 'Patients' },
    { id: 'MedicalRecords', icon: FileCheck, label: 'Medical Records' },
    { id: 'Appointments', icon: Clock, label: 'Appointments' },
    { id: 'Documents', icon: FileText, label: 'Documents' },
    { id: 'Settings', icon: Settings, label: 'Settings' },
  ];

  const NotificationsPanel = () => (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button onClick={() => setShowNotifications(false)}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 border-b hover:bg-gray-50">
            <h4 className="text-sm font-medium">{notification.title}</h4>
            <p className="text-sm text-gray-600">{notification.message}</p>
            <span className="text-xs text-gray-500">{notification.time}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const SettingsPanel = () => (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Settings</h3>
          <button onClick={() => setShowSettings(false)}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Notifications</span>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
            className="toggle"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Dark Mode</span>
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
            className="toggle"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm block">Language</label>
          <select
            value={settings.language}
            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            className="w-full rounded-md border-gray-300"
          >
            <option>English</option>
            <option>French</option>
            <option>Arabic</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {isLoggedIn ? (
        <div className="flex h-screen overflow-hidden">
          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside 
            className={`
              fixed md:relative
              inset-y-0 left-0
              z-30 md:z-0
              w-[280px] md:w-[280px]
              transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
              transition-all duration-300 ease-in-out
              bg-white shadow-lg
              flex flex-col
            `}
          >
            <div className="p-4 border-b flex items-center justify-between h-16">
              <h2 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
                WaslMed
              </h2>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 5 }}
                    onClick={() => {
                      setActiveSection(item.id);
                      if (window.innerWidth < 768) setIsSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center
                      px-3 py-3 rounded-lg
                      text-gray-600 hover:bg-blue-50 hover:text-blue-600
                      transition-colors duration-200
                      ${activeSection === item.id ? 'bg-blue-50 text-blue-600' : ''}
                    `}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="ml-3 whitespace-nowrap">
                      {item.label}
                    </span>
                  </motion.button>
                ))}

                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-6 h-6" />
                  <span className="ml-3 whitespace-nowrap">
                    Logout
                  </span>
                </motion.button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col h-screen overflow-hidden">
            {/* Header */}
            <header className="bg-white shadow-sm h-16 flex items-center px-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-gray-500 hover:text-gray-700 md:hidden"
                  >
                    <ArrowLeft size={24} className={`transform transition-transform ${isSidebarOpen ? '' : 'rotate-180'}`} />
                  </button>
                  <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
                    {activeSection}
                  </h1>
                </div>

                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startQRScanner}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <QrCode className="w-5 h-5" />
                    <span>Scan Patient QR</span>
                  </motion.button>

                  <div className="relative">
                    <button 
                      onClick={() => setShowNotifications(!showNotifications)} 
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <Bell className="w-5 h-5 text-gray-600" />
                      {notifications.length > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </button>
                    {showNotifications && <NotificationsPanel />}
                  </div>

                  <div className="relative">
                    <button 
                      onClick={() => setShowSettings(!showSettings)} 
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <Settings className="w-5 h-5 text-gray-600" />
                    </button>
                    {showSettings && <SettingsPanel />}
                  </div>

                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto bg-gray-50">
              {activeSection === 'Dashboard' && <DashboardContent />}
              {activeSection === 'Analytics' && <AnalyticsContent />}
              {activeSection === 'Schedule' && <ScheduleContent />}
              {activeSection === 'Patients' && <PatientsContent />}
              {activeSection === 'MedicalRecords' && <MedicalRecordsContent />}
              {activeSection === 'Appointments' && <AppointmentsContent />}
              {activeSection === 'Documents' && <DocumentsContent />}
              {activeSection === 'Settings' && <SettingsContent />}
            </div>
          </main>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto pt-20 px-4 sm:px-6"
        >
          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.02, x: -5 }}
            whileTap={{ scale: 0.98 }}
            className="group mb-8 inline-flex items-center px-4 py-2 rounded-full bg-white/50 hover:bg-white/80 shadow-sm transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2 text-gray-600 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Back to Selection</span>
          </motion.button>

          <div className="bg-white shadow-xl rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Doctor Login</h1>
              <p className="text-gray-600 mt-2">Access your dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username/ID
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Sign In
              </motion.button>
            </form>
          </div>
        </motion.div>
      )}

      {showQRScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Scan Patient QR Code</h3>
              <button
                onClick={() => setShowQRScanner(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div id="qr-reader" className="w-full"></div>
            <p className="text-sm text-gray-600 text-center mt-4">
              Position the QR code within the frame to scan
            </p>
          </div>
        </div>
      )}

      {showPatientDetails && activePatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Patient Details</h3>
              <button
                onClick={() => setShowPatientDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700">Personal Information</h4>
                  <p>Name: {activePatient.name}</p>
                  <p>ID: {activePatient.id}</p>
                  <p>Blood Type: {activePatient.bloodType}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700">Emergency Contact</h4>
                  <p>{activePatient.emergencyContact}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700">Allergies</h4>
                <ul className="list-disc list-inside">
                  {activePatient.allergies.map((allergy: string, index: number) => (
                    <li key={index}>{allergy}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-700">Current Medications</h4>
                <ul className="list-disc list-inside">
                  {activePatient.currentMedications.map((medication: string, index: number) => (
                    <li key={index}>{medication}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowPatientDetails(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Add to patient list or start consultation
                    setShowPatientDetails(false);
                    // Additional logic here
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Start Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
