"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X, Download, Check, Share2, User, Building, Calendar, ClipboardList, Award, Trophy, Star, Printer, Brain, Sparkles, Bot, MessageSquare, Activity, Zap, HeartPulse, Stethoscope, Microscope, BrainCircuit } from 'lucide-react';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import VitalSignsCard from './components/VitalSignsCard';
import AppointmentsCard from './components/AppointmentsCard';
import MedicationsCard from './components/MedicationsCard';
import NotificationsCard from './components/NotificationsCard';
import HealthJourneyCard from './components/HealthJourneyCard';
import LabResultsCard from './components/LabResultsCard';
import QuickStatsCard from './components/QuickStatsCard';
import ActionBar from './components/ActionBar';
import MedicalHistoryCard from './components/MedicalHistoryCard';
import QRCodeGenerator from './components/QRCodeGenerator';
import { QRCodeSVG } from 'qrcode.react';
import NotificationPanel from './components/NotificationPanel';

export default function PatientDemoPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [showVitalHistory, setShowVitalHistory] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [showDoctorHistory, setShowDoctorHistory] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI health assistant. How can I help you today?' }
  ]);
  const [isAITyping, setIsAITyping] = useState(false);
  const [healthPredictions, setHealthPredictions] = useState({
    diabetesRisk: { score: 0.15, trend: 'decreasing', recommendations: ['Maintain healthy diet', 'Regular exercise'] },
    cardiacHealth: { score: 0.85, trend: 'stable', recommendations: ['Continue blood pressure monitoring'] },
    mentalWellness: { score: 0.92, trend: 'improving', recommendations: ['Maintain work-life balance'] },
  });
  const [aiInsights, setAiInsights] = useState([
    { type: 'alert', message: 'Blood pressure trending slightly high this week', severity: 'medium' },
    { type: 'improvement', message: 'Sleep quality has improved by 15% this month', severity: 'low' },
    { type: 'recommendation', message: 'Consider scheduling a follow-up for diabetes management', severity: 'high' },
  ]);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [aiActiveTab, setAiActiveTab] = useState('symptoms');
  const [symptomInput, setSymptomInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [aiDiagnosis, setAiDiagnosis] = useState(null);
  const [voiceInput, setVoiceInput] = useState(false);
  const [healthScore, setHealthScore] = useState({
    overall: 87,
    categories: {
      physical: 90,
      mental: 85,
      nutrition: 82,
      sleep: 88,
      activity: 84
    }
  });

  const [patientData, setPatientData] = useState({
    personalInfo: {
      name: 'Abdellah Raissouni',
      age: 20,
      gender: 'Male',
      bloodType: 'A+',
      height: '167 cm',
      weight: '65 kg',
      nationalId: 'MAR123456789',
      dateOfBirth: '2003-09-28',
      maritalStatus: 'Single',
      occupation: 'Software Engineer',
      insurance: 'Premium Health Care',
      nationality: 'Morocco',
      languages: ['Arabic', 'English', 'Spanish', 'French'],
      emergencyContacts: [
        {
          name: 'Naoufal Raissouni',
          relation: 'Father',
          phone: '+212 50 123 4567',
          address: '123 Palm Street, Tetouan'
        },
        {
          name: 'Rahid Raissouni',
          relation: 'Brother',
          phone: '+212 55 987 6543',
          address: '456 Date Street, Tetouan'
        }
      ]
    },
    medicalHistory: [
      {
        condition: 'Type 2 Diabetes',
        date: '2022-03-15',
        status: 'Ongoing',
        notes: 'Well controlled with medication and diet',
        doctor: 'Dr. Sarah Al-Rashid',
        hospital: 'King Faisal Specialist Hospital',
        followUp: '2024-03-20'
      },
      {
        condition: 'Hypertension',
        date: '2023-01-15',
        status: 'Ongoing',
        notes: 'Regular monitoring required, responds well to current medication',
        doctor: 'Dr. Mohammed Hassan',
        hospital: 'Saudi German Hospital',
        followUp: '2024-03-01'
      },
      {
        condition: 'Knee Surgery',
        date: '2021-06-10',
        status: 'Resolved',
        notes: 'Arthroscopic surgery on right knee, full recovery achieved',
        doctor: 'Dr. Ahmad Al-Sayed',
        hospital: 'Dr. Sulaiman Al Habib Hospital',
        followUp: 'Completed'
      }
    ],
    doctorHistory: [
      {
        name: 'Dr. Sarah Al-Rashid',
        specialty: 'Endocrinologist',
        hospital: 'King Faisal Specialist Hospital',
        rating: 4.9,
        visits: 8,
        lastVisit: '2024-01-15',
        nextAppointment: '2024-03-20',
        notes: 'Primary diabetes care provider',
        image: '/doctors/dr-sarah.jpg',
        availability: ['Monday', 'Wednesday', 'Thursday'],
        languages: ['Arabic', 'English', 'French'],
        education: [
          'MBBS - King Saud University',
          'Fellowship in Endocrinology - Johns Hopkins University'
        ],
        specializations: [
          'Diabetes Management',
          'Thyroid Disorders',
          'Hormonal Imbalances'
        ],
        achievements: [
          'Best Doctor Award 2023 - Saudi Medical Association',
          'Published 15+ research papers in diabetes care'
        ]
      },
      {
        name: 'Dr. Mohammed Hassan',
        specialty: 'Cardiologist',
        hospital: 'Saudi German Hospital',
        rating: 4.8,
        visits: 5,
        lastVisit: '2024-02-01',
        nextAppointment: '2024-03-01',
        notes: 'Managing hypertension treatment',
        image: '/doctors/dr-mohammed.jpg',
        availability: ['Sunday', 'Tuesday', 'Thursday'],
        languages: ['Arabic', 'English'],
        education: [
          'MBBS - King Abdulaziz University',
          'Cardiology Specialization - Cleveland Clinic'
        ],
        specializations: [
          'Interventional Cardiology',
          'Hypertension Management',
          'Heart Disease Prevention'
        ],
        achievements: [
          'Pioneer in Minimally Invasive Cardiac Procedures',
          'Head of Cardiology Department'
        ]
      },
      {
        name: 'Dr. Ahmad Al-Sayed',
        specialty: 'Orthopedic Surgeon',
        hospital: 'Dr. Sulaiman Al Habib Hospital',
        rating: 5.0,
        visits: 6,
        lastVisit: '2023-12-10',
        nextAppointment: null,
        notes: 'Performed knee surgery, follow-ups completed',
        image: '/doctors/dr-ahmad.jpg',
        availability: ['Monday', 'Wednesday', 'Saturday'],
        languages: ['Arabic', 'English', 'German'],
        education: [
          'MBBS - King Faisal University',
          'Orthopedic Surgery Fellowship - Berlin University Hospital'
        ],
        specializations: [
          'Sports Medicine',
          'Joint Replacement',
          'Arthroscopic Surgery'
        ],
        achievements: [
          'Performed 1000+ successful surgeries',
          'International Speaker on Sports Medicine'
        ]
      }
    ],
    allergies: [
      {
        name: 'Penicillin',
        type: 'Drug',
        severity: 'High',
        reaction: 'Severe rash and difficulty breathing',
        diagnosed: '2019-05-20',
        diagnosedBy: 'Dr. Fatima Al-Omar',
        notes: 'Requires immediate medical attention if exposed'
      },
      {
        name: 'Peanuts',
        type: 'Food',
        severity: 'Moderate',
        reaction: 'Hives and swelling',
        diagnosed: '2018-03-15',
        diagnosedBy: 'Dr. Khalid Al-Nasser',
        notes: 'Carries EpiPen as precaution'
      }
    ],
    medications: [
      {
        name: 'Metformin',
        dosage: '1000mg',
        frequency: 'Twice daily',
        startDate: '2022-03-15',
        endDate: 'Ongoing',
        prescribedBy: 'Dr. Sarah Al-Rashid',
        purpose: 'Diabetes management',
        sideEffects: 'Mild stomach discomfort initially',
        instructions: 'Take with meals',
        refills: 2
      },
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        startDate: '2023-01-15',
        endDate: 'Ongoing',
        prescribedBy: 'Dr. Mohammed Hassan',
        purpose: 'Blood pressure control',
        sideEffects: 'None reported',
        instructions: 'Take in the morning',
        refills: 3
      }
    ],
    upcomingAppointments: [
      {
        doctor: 'Dr. Sarah Al-Rashid',
        specialty: 'Endocrinologist',
        date: '2024-03-20',
        time: '10:00 AM',
        location: 'King Faisal Specialist Hospital',
        purpose: 'Diabetes Follow-up',
        status: 'Confirmed'
      },
      {
        doctor: 'Dr. Mohammed Hassan',
        specialty: 'Cardiologist',
        date: '2024-03-01',
        time: '2:30 PM',
        location: 'Saudi German Hospital',
        purpose: 'Hypertension Check',
        status: 'Confirmed'
      }
    ],
    vaccinations: [
      {
        name: 'COVID-19',
        date: '2023-09-15',
        manufacturer: 'Pfizer',
        batch: 'PF123456',
        location: 'King Faisal Hospital',
        nextDue: null,
        notes: 'Booster shot'
      },
      {
        name: 'Influenza',
        date: '2023-11-01',
        manufacturer: 'GSK',
        batch: 'GSK789012',
        location: 'Saudi German Hospital',
        nextDue: '2024-11-01',
        notes: 'Annual flu shot'
      }
    ],
    vitalSigns: [
      {
        date: '2024-02-01',
        bloodPressure: '120/80',
        heartRate: '72',
        temperature: '36.6°C',
        respiratoryRate: '16',
        oxygenSaturation: '98%'
      }
    ],
    insurance: {
      provider: 'Health Insurance Co',
      policyNumber: 'POL123456',
      validUntil: '2024-12-31',
      type: 'Comprehensive'
    }
  });

  const healthJourneyData = {
    currentScore: 85,
    goals: [
      {
        title: "Daily Steps",
        progress: 8000,
        target: 10000,
        unit: "steps"
      },
      {
        title: "Weekly Exercise",
        progress: 4,
        target: 5,
        unit: "hours"
      },
      {
        title: "Sleep Schedule",
        progress: 7,
        target: 8,
        unit: "hours"
      }
    ]
  };

  const labResultsData = {
    results: [
      {
        testName: "Blood Glucose",
        date: "2025-02-09",
        value: 95,
        unit: "mg/dL",
        normalRange: { min: 70, max: 100 },
        trend: "stable",
        status: "normal"
      },
      {
        testName: "Cholesterol",
        date: "2025-02-09",
        value: 220,
        unit: "mg/dL",
        normalRange: { min: 150, max: 200 },
        trend: "up",
        status: "high"
      },
      {
        testName: "Blood Pressure",
        date: "2025-02-09",
        value: 110,
        unit: "mmHg",
        normalRange: { min: 90, max: 120 },
        trend: "down",
        status: "normal"
      }
    ]
  };

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Upcoming Appointment',
      message: 'You have an appointment with Dr. Sarah Al-Rashid tomorrow at 10:00 AM',
      time: '1 hour ago',
      read: false,
      type: 'appointment'
    },
    {
      id: 2,
      title: 'New Lab Results',
      message: 'Your recent blood work results are now available. Click to view.',
      time: '2 hours ago',
      read: false,
      type: 'result'
    },
    {
      id: 3,
      title: 'Medication Reminder',
      message: 'Time to take your evening dose of Metformin (500mg)',
      time: '30 minutes ago',
      read: false,
      type: 'medication'
    },
    {
      id: 4,
      title: 'Health Achievement',
      message: 'Congratulations! You\'ve maintained a healthy blood pressure for 30 days straight. Keep up the good work! 🎉',
      time: 'Just now',
      read: false,
      type: 'general'
    }
  ]);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3); // Initial unread count

  const generateQRCode = () => {
    const medicalSummary = {
      name: patientData.personalInfo.name,
      bloodType: patientData.personalInfo.bloodType,
      emergencyContact: patientData.personalInfo.emergencyContacts[0],
      allergies: patientData.allergies.map(a => `${a.name} (${a.severity})`),
      currentMedications: patientData.medications.map(m => `${m.name} ${m.dosage}`),
      conditions: patientData.medicalHistory.filter(h => h.status === 'Ongoing').map(h => h.condition)
    };
    setQrCodeData(JSON.stringify(medicalSummary));
    setShowQRModal(true);
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
    showToast(`Booking appointment with ${doctor.name}`);
  };

  const handleShareRecords = () => {
    setShowShareOptions(true);
    // Add sharing functionality
  };

  const handleNotificationClick = () => {
    setShowNotificationPanel(!showNotificationPanel);
    if (unreadNotifications > 0) {
      setUnreadNotifications(0); // Clear unread count when notifications are opened
    }
  };

  const handleSettingsClick = () => {
    showToast('Settings panel will be available soon');
  };

  const handleNotificationRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

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

  const showToast = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleImageUpload = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    localStorage.setItem('profilePicture', imageUrl);
  };

  useEffect(() => {
    // Load the profile picture from localStorage when component mounts
    const savedImage = localStorage.getItem('profilePicture');
    if (savedImage) {
      setSelectedImage(savedImage);
    }
  }, []);

  const quickStats = {
    appointments: 3,
    prescriptions: 5,
    checkups: 8,
    streak: 15,
    bmi: 23.4,
    healthScore: 85,
    adherence: 92,
    progress: 78
  };

  const MedicalMiniGame = () => {
    const [currentFact, setCurrentFact] = useState('');
    const [powerUps, setPowerUps] = useState<Array<{ id: number; type: 'antibody' | 'vitamin'; x: number; y: number }>>([]);

    // Educational facts about immune system
    const immuneFacts = [
      'T-cells identify and attack infected cells!',
      'Antibodies neutralize pathogens in the bloodstream!',
      'Fever helps slow pathogen reproduction!',
      'Phagocytes engulf and digest invaders!'
    ];

    useEffect(() => {
      const factInterval = setInterval(() => {
        setCurrentFact(immuneFacts[Math.floor(Math.random() * immuneFacts.length)]);
      }, 10000);

      const powerUpSpawner = setInterval(() => {
        setPowerUps(prev => [...prev, {
          id: Date.now(),
          type: Math.random() > 0.5 ? 'antibody' : 'vitamin',
          x: Math.random() * 90,
          y: Math.random() * 90
        }]);
      }, 15000);

      return () => {
        clearInterval(factInterval);
        clearInterval(powerUpSpawner);
      };
    }, []);

    const handleCollectPowerUp = (id: number, type: 'antibody' | 'vitamin') => {
      setPowerUps(prev => prev.filter(p => p.id !== id));
      setEnergy(e => Math.min(100, e + (type === 'antibody' ? 30 : 15)));
      setScore(s => s + (type === 'antibody' ? 200 : 100));
    };

    return (
      <div className="fixed bottom-4 right-4 ...">
        {/* Fact Popup */}
        {currentFact && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="absolute -top-24 left-0 right-0 bg-blue-50 p-3 rounded-lg border border-blue-200 text-sm"
          >
            💡 Did you know?
            <div className="text-blue-800 mt-1">{currentFact}</div>
          </motion.div>
        )}

        {/* Power-Ups */}
        {powerUps.map(({ id, type, x, y }) => (
          <motion.div
            key={id}
            className="absolute cursor-pointer text-2xl"
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => handleCollectPowerUp(id, type)}
          >
            {type === 'antibody' ? '🛡️' : '🟢'}
          </motion.div>
        ))}
      </div>
    );
  };

  const simulateAIResponse = async (message) => {
    setIsAITyping(true);
    const responses = [
      "Based on your recent vital signs, I notice your blood pressure has been well-maintained. Keep up your medication schedule!",
      "Your latest lab results show improvement in blood glucose levels. Would you like me to explain the trends?",
      "I've analyzed your sleep patterns and noticed some irregularities. Consider adjusting your evening routine.",
      "Your medication adherence has been excellent this month. This is positively impacting your health metrics."
    ];
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAiMessages(prev => [...prev, 
      { role: 'user', content: message },
      { role: 'assistant', content: responses[Math.floor(Math.random() * responses.length)] }
    ]);
    setIsAITyping(false);
  };

  const AIComponents = () => (
    <div className="mt-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center mb-4">
          <Brain className="w-6 h-6 text-purple-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-800">AI Health Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(healthPredictions).map(([key, data]) => (
            <div key={key} className="bg-white rounded-lg p-4 shadow">
              <h4 className="font-medium text-gray-700 mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
              <div className="flex items-center mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      data.score > 0.7 ? 'bg-green-500' : data.score > 0.3 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${data.score * 100}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-600">{Math.round(data.score * 100)}%</span>
              </div>
              <div className="flex items-center text-sm">
                <span className={`mr-2 ${
                  data.trend === 'improving' ? 'text-green-500' : 
                  data.trend === 'decreasing' ? 'text-red-500' : 
                  'text-yellow-500'
                }`}>●</span>
                {data.trend}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Bot className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">AI Assistant Chat</h3>
          </div>
          <button
            onClick={() => setShowAIChat(!showAIChat)}
            className="text-gray-500 hover:text-gray-700"
          >
            {showAIChat ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
          </button>
        </div>
        {showAIChat && (
          <div className="p-4">
            <div className="h-64 overflow-y-auto mb-4 space-y-4">
              {aiMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isAITyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <span className="animate-pulse">Typing...</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about your health..."
                className="flex-1 p-2 border rounded-lg"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    simulateAIResponse(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => simulateAIResponse("How are my vital signs today?")}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center mb-4">
          <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
          <h3 className="text-xl font-semibold text-gray-800">AI Generated Insights</h3>
        </div>
        <div className="space-y-4">
          {aiInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-l-4 ${
                insight.severity === 'high' ? 'border-red-500 bg-red-50' :
                insight.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                'border-green-500 bg-green-50'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <p className={`text-sm ${
                    insight.severity === 'high' ? 'text-red-700' :
                    insight.severity === 'medium' ? 'text-yellow-700' :
                    'text-green-700'
                  }`}>
                    {insight.message}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const simulateSymptomAnalysis = async (symptoms) => {
    setAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockDiagnosis = {
      possibleConditions: [
        { name: 'Common Cold', probability: 0.85, urgency: 'low' },
        { name: 'Seasonal Allergies', probability: 0.65, urgency: 'low' },
        { name: 'Sinusitis', probability: 0.45, urgency: 'medium' }
      ],
      recommendations: [
        { type: 'rest', description: 'Get adequate rest for the next 48 hours' },
        { type: 'hydration', description: 'Increase fluid intake to 3L per day' },
        { type: 'medication', description: 'Consider over-the-counter antihistamines' }
      ],
      requiredTests: ['Blood Test', 'Allergy Panel'],
      lifestyle: [
        { category: 'Diet', suggestion: 'Increase Vitamin C intake' },
        { category: 'Exercise', suggestion: 'Light stretching only until symptoms improve' },
        { category: 'Sleep', suggestion: 'Aim for 8-9 hours with elevated head position' }
      ]
    };

    setAiDiagnosis(mockDiagnosis);
    setAnalyzing(false);
  };

  const AIHealthAnalyzer = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mt-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BrainCircuit className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">AI Health Analyzer</h2>
        </div>
        <div className="flex space-x-2">
          {['symptoms', 'insights', 'trends'].map((tab) => (
            <button
              key={tab}
              onClick={() => setAiActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                aiActiveTab === tab
                  ? 'bg-purple-100 text-purple-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {aiActiveTab === 'symptoms' && (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              placeholder="Describe your symptoms... (e.g., headache, fever)"
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-300"
            />
            <button
              onClick={() => voiceInput ? setVoiceInput(false) : setVoiceInput(true)}
              className={`p-3 rounded-lg ${
                voiceInput ? 'bg-red-500' : 'bg-blue-500'
              } text-white`}
            >
              {voiceInput ? 'Stop' : 'Voice Input'}
            </button>
            <button
              onClick={() => simulateSymptomAnalysis(symptomInput)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
            >
              Analyze
            </button>
          </div>

          {analyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-4"
            >
              <div className="flex items-center justify-center space-x-2">
                <Microscope className="w-6 h-6 text-purple-600 animate-pulse" />
                <span className="text-lg text-gray-700">Analyzing symptoms...</span>
              </div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-purple-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </motion.div>
          )}

          {aiDiagnosis && !analyzing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-3">Possible Conditions</h3>
                  {aiDiagnosis.possibleConditions.map((condition, index) => (
                    <div key={index} className="mb-2 last:mb-0">
                      <div className="flex justify-between items-center">
                        <span>{condition.name}</span>
                        <span className={`px-2 py-1 rounded text-sm ${
                          condition.urgency === 'high' ? 'bg-red-100 text-red-700' :
                          condition.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {Math.round(condition.probability * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-purple-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-purple-600 h-1.5 rounded-full"
                          style={{ width: `${condition.probability * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3">Recommended Actions</h3>
                  {aiDiagnosis.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start mb-2 last:mb-0">
                      <div className="bg-blue-100 p-1 rounded mr-2">
                        {rec.type === 'rest' ? '🛏️' :
                         rec.type === 'hydration' ? '💧' :
                         rec.type === 'medication' ? '💊' : '✨'}
                      </div>
                      <span className="text-blue-800">{rec.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">Lifestyle Adjustments</h3>
                  {aiDiagnosis.lifestyle.map((item, index) => (
                    <div key={index} className="mb-2 last:mb-0">
                      <span className="font-medium text-green-700">{item.category}:</span>
                      <p className="text-green-800 ml-4">{item.suggestion}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-3">Required Tests</h3>
                  <div className="space-y-2">
                    {aiDiagnosis.requiredTests.map((test, index) => (
                      <div key={index} className="flex items-center">
                        <Stethoscope className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="text-yellow-800">{test}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {aiActiveTab === 'insights' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(healthScore.categories).map(([category, score]) => (
              <motion.div
                key={category}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg"
              >
                <h3 className="font-semibold text-gray-700 mb-2 capitalize">{category}</h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full bg-purple-600"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{score}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {aiActiveTab === 'trends' && (
        <div className="space-y-6">
          {/* Add health trends visualization here */}
        </div>
      )}
    </motion.div>
  );

  if (isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Header 
          unreadNotifications={unreadNotifications}
          onNotificationClick={handleNotificationClick}
          onSettingsClick={handleSettingsClick}
          onLogout={() => setIsLoggedIn(false)}
        />
        
        <AnimatePresence>
          <NotificationPanel
            show={showNotificationPanel}
            onClose={() => setShowNotificationPanel(false)}
            notifications={notifications}
            onNotificationRead={handleNotificationRead}
          />
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-6 mt-6">
          <ActionBar 
            onGenerateQR={generateQRCode}
            onEmergency={() => showToast('Emergency contacts have been notified')}
          />
          <ProfileCard 
            patientInfo={patientData.personalInfo}
            onGenerateQR={generateQRCode}
            onEmergency={() => showToast('Emergency contacts have been notified')}
          />
          <QuickStatsCard stats={quickStats} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VitalSignsCard vitalSigns={patientData.vitalSigns} />
            <MedicalHistoryCard medicalHistory={patientData.medicalHistory} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AppointmentsCard 
              appointments={patientData.upcomingAppointments}
              onBookAppointment={() => showToast('Booking system opening soon')}
            />
            <MedicationsCard 
              medications={patientData.medications}
              onRequestRefill={(medication) => showToast(`Refill requested for ${medication}`)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HealthJourneyCard
                currentScore={healthJourneyData.currentScore}
                goals={healthJourneyData.goals}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <LabResultsCard results={labResultsData.results} />
            </motion.div>
          </div>

          <AIComponents />

          <AIHealthAnalyzer />

          {/* Notification Toast */}
          <AnimatePresence>
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50 flex items-center"
              >
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-gray-800">{notificationMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notification Panel */}
          {/* <AnimatePresence>
            {showNotificationPanel && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-16 right-4 w-80 bg-white rounded-xl shadow-lg z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                    <button
                      onClick={() => setShowNotificationPanel(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-800">{notification.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence> */}

          {/* Print Preview Modal */}
          {showPrintPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white p-8 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Medical Summary</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => window.print()}
                      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print
                    </button>
                    <button
                      onClick={() => setShowPrintPreview(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                {/* Print preview content */}
              </motion.div>
            </motion.div>
          )}

          {/* Image Upload Modal */}
          {showImageUpload && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Update Profile Picture</h3>
                  <button
                    onClick={() => setShowImageUpload(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        handleImageUpload(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                    setShowImageUpload(false);
                  }}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Doctor History Modal */}
          {showDoctorHistory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white p-8 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Doctor History</h3>
                  <button
                    onClick={() => setShowDoctorHistory(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {patientData.doctorHistory.map((doctor, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                    >
                      <div className="flex items-start mb-6">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <User className="w-10 h-10 text-blue-600" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-xl font-semibold">{doctor.name}</h4>
                              <p className="text-gray-600">{doctor.specialty}</p>
                            </div>
                            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(doctor.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="ml-2 text-sm font-medium text-yellow-700">
                                {doctor.rating}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 space-y-3">
                            <p className="text-sm text-gray-600 flex items-center">
                              <Building className="w-4 h-4 mr-2 text-blue-500" />
                              {doctor.hospital}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-green-500" />
                              Last Visit: {doctor.lastVisit}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                              <ClipboardList className="w-4 h-4 mr-2 text-purple-500" />
                              Total Visits: {doctor.visits}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">Availability</h5>
                          <div className="flex flex-wrap gap-2">
                            {doctor.availability.map((day, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                              >
                                {day}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">Languages</h5>
                          <div className="flex flex-wrap gap-2">
                            {doctor.languages.map((lang, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">Specializations</h5>
                          <div className="flex flex-wrap gap-2">
                            {doctor.specializations.map((spec, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">Education</h5>
                          <ul className="space-y-1">
                            {doctor.education.map((edu, i) => (
                              <li key={i} className="text-sm text-gray-600 flex items-center">
                                <Award className="w-4 h-4 mr-2 text-blue-500" />
                                {edu}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-2">Achievements</h5>
                          <ul className="space-y-1">
                            {doctor.achievements.map((achievement, i) => (
                              <li key={i} className="text-sm text-gray-600 flex items-center">
                                <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleBookAppointment(doctor)}
                          className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Appointment
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            showToast(`Viewing ${doctor.name}'s full profile`);
                          }}
                          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                        >
                          <User className="w-4 h-4 mr-2" />
                          View Profile
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* QR Code Button */}
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => setShowQRModal(true)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2m0 0H8m0 0H5m0 0H2m0 0l3-3m0 0l-3-3m3 3v18"
                />
              </svg>
              <span>Generate QR Code</span>
            </button>
          </div>

          {/* QR Code Modal */}
          {showQRModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Medical ID</h2>
                  <button
                    onClick={() => setShowQRModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <QRCodeSVG
                      value={JSON.stringify({
                        name: patientData.personalInfo.name,
                        bloodType: patientData.personalInfo.bloodType,
                        emergencyContact: patientData.personalInfo.emergencyContacts[0],
                        allergies: patientData.allergies.map(a => `${a.name} (${a.severity})`),
                        currentMedications: patientData.medications.map(m => `${m.name} ${m.dosage}`),
                        conditions: patientData.medicalHistory.filter(h => h.status === 'Ongoing').map(h => h.condition)
                      })}
                      size={200}
                      level="H"
                      includeMargin={true}
                      className="mx-auto"
                    />
                  </div>
                  <div className="col-span-1 space-y-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h3 className="font-semibold text-blue-800">Emergency Info</h3>
                      <p>Blood Type: {patientData.personalInfo.bloodType}</p>
                      <p>Emergency Contact: {patientData.personalInfo.emergencyContacts[0].name}</p>
                    </div>
                    
                    <div className="bg-red-50 p-3 rounded-lg">
                      <h3 className="font-semibold text-red-800">Allergies</h3>
                      {patientData.allergies.map((allergy, index) => (
                        <p key={index}>{allergy.name} - {allergy.severity}</p>
                      ))}
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h3 className="font-semibold text-green-800">Current Medications</h3>
                      {patientData.medications.map((med, index) => (
                        <p key={index}>{med.name} {med.dosage}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* QR Code Generator Section at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 w-full"
          >
            <QRCodeGenerator patientData={{
              name: patientData.personalInfo.name,
              bloodType: patientData.personalInfo.bloodType,
              emergencyContact: patientData.personalInfo.emergencyContacts[0],
              allergies: patientData.allergies.map(a => `${a.name} (${a.severity})`),
              currentMedications: patientData.medications.map(m => `${m.name} ${m.dosage}`),
              conditions: patientData.medicalHistory.filter(h => h.status === 'Ongoing').map(h => h.condition)
            }} />
          </motion.div>

          <MedicalMiniGame />
        </div>
      </div>
    );
  }

  // Login view
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Patient Login</h2>
        <button
          onClick={() => setIsLoggedIn(true)}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          Login as Demo Patient
        </button>
      </div>
    </div>
  );
}
