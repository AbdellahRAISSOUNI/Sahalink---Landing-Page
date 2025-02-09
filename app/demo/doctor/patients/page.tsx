"use client"

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Calendar, Clock, FileText, Activity, ChevronLeft, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Sample patient data
const patientsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    phone: "+212 6XX-XXXXXX",
    email: "sarah.j@example.com",
    lastVisit: "2025-02-01",
    nextAppointment: "2025-02-15",
    medicalHistory: ["Hypertension", "Allergies"],
    medications: ["Lisinopril 10mg", "Antihistamine"],
    recentVisits: [
      { date: "2025-02-01", reason: "Regular Checkup", notes: "Blood pressure normal" },
      { date: "2024-12-15", reason: "Flu Symptoms", notes: "Prescribed antibiotics" }
    ],
    profileImage: "/placeholder-user.jpg"
  },
  {
    id: 2,
    name: "Mohammed Ahmed",
    age: 45,
    gender: "Male",
    phone: "+212 6XX-XXXXXX",
    email: "m.ahmed@example.com",
    lastVisit: "2025-01-28",
    nextAppointment: "2025-02-20",
    medicalHistory: ["Type 2 Diabetes", "High Cholesterol"],
    medications: ["Metformin 500mg", "Statins"],
    recentVisits: [
      { date: "2025-01-28", reason: "Diabetes Follow-up", notes: "A1C levels improved" },
      { date: "2024-12-20", reason: "Annual Physical", notes: "Overall health stable" }
    ],
    profileImage: "/placeholder-user.jpg"
  },
  {
    id: 3,
    name: "Fatima El Amrani",
    age: 28,
    gender: "Female",
    phone: "+212 6XX-XXXXXX",
    email: "f.elamrani@example.com",
    lastVisit: "2025-02-05",
    nextAppointment: "2025-03-01",
    medicalHistory: ["Asthma"],
    medications: ["Albuterol inhaler"],
    recentVisits: [
      { date: "2025-02-05", reason: "Asthma Follow-up", notes: "Breathing improved" },
      { date: "2024-11-15", reason: "Respiratory Issues", notes: "New inhaler prescribed" }
    ],
    profileImage: "/placeholder-user.jpg"
  },
  {
    id: 4,
    name: "Youssef Benali",
    age: 52,
    gender: "Male",
    phone: "+212 6XX-XXXXXX",
    email: "y.benali@example.com",
    lastVisit: "2025-02-03",
    nextAppointment: "2025-02-25",
    medicalHistory: ["Arthritis", "Hypertension"],
    medications: ["Diclofenac 50mg", "Amlodipine 5mg"],
    recentVisits: [
      { date: "2025-02-03", reason: "Joint Pain", notes: "Prescribed new pain management regime" },
      { date: "2024-12-10", reason: "Blood Pressure Check", notes: "BP slightly elevated" }
    ],
    profileImage: "/placeholder-user.jpg"
  },
  {
    id: 5,
    name: "Amina Tazi",
    age: 35,
    gender: "Female",
    phone: "+212 6XX-XXXXXX",
    email: "a.tazi@example.com",
    lastVisit: "2025-02-07",
    nextAppointment: "2025-02-28",
    medicalHistory: ["Migraine", "Anxiety"],
    medications: ["Sumatriptan", "Escitalopram"],
    recentVisits: [
      { date: "2025-02-07", reason: "Migraine Follow-up", notes: "Frequency of episodes reduced" },
      { date: "2024-12-22", reason: "Mental Health Check", notes: "Showing improvement" }
    ],
    profileImage: "/placeholder-user.jpg"
  },
  {
    id: 6,
    name: "Karim Idrissi",
    age: 41,
    gender: "Male",
    phone: "+212 6XX-XXXXXX",
    email: "k.idrissi@example.com",
    lastVisit: "2025-01-30",
    nextAppointment: "2025-02-22",
    medicalHistory: ["Lower Back Pain", "Insomnia"],
    medications: ["Cyclobenzaprine", "Melatonin"],
    recentVisits: [
      { date: "2025-01-30", reason: "Back Pain Follow-up", notes: "Physical therapy recommended" },
      { date: "2024-12-18", reason: "Sleep Study Results", notes: "Sleep hygiene discussed" }
    ],
    profileImage: "/placeholder-user.jpg"
  },
  {
    id: 7,
    name: "Laila Moussaoui",
    age: 29,
    gender: "Female",
    phone: "+212 6XX-XXXXXX",
    email: "l.moussaoui@example.com",
    lastVisit: "2025-02-06",
    nextAppointment: "2025-03-05",
    medicalHistory: ["PCOS", "Iron Deficiency"],
    medications: ["Birth Control", "Iron Supplements"],
    recentVisits: [
      { date: "2025-02-06", reason: "Hormonal Check", notes: "Hormone levels stabilizing" },
      { date: "2024-12-05", reason: "Blood Work", notes: "Iron levels improving" }
    ],
    profileImage: "/placeholder-user.jpg"
  },
  {
    id: 8,
    name: "Hassan Ouazzani",
    age: 63,
    gender: "Male",
    phone: "+212 6XX-XXXXXX",
    email: "h.ouazzani@example.com",
    lastVisit: "2025-02-02",
    nextAppointment: "2025-02-18",
    medicalHistory: ["Coronary Artery Disease", "Type 2 Diabetes"],
    medications: ["Aspirin", "Metformin", "Atorvastatin"],
    recentVisits: [
      { date: "2025-02-02", reason: "Cardiac Follow-up", notes: "ECG shows stable rhythm" },
      { date: "2024-12-12", reason: "Diabetes Check", notes: "Blood sugar well controlled" }
    ],
    profileImage: "/placeholder-user.jpg"
  },
  {
    id: 9,
    name: "Nadia Chaoui",
    age: 38,
    gender: "Female",
    phone: "+212 6XX-XXXXXX",
    email: "n.chaoui@example.com",
    lastVisit: "2025-02-04",
    nextAppointment: "2025-02-24",
    medicalHistory: ["Hypothyroidism", "Vitamin D Deficiency"],
    medications: ["Levothyroxine", "Vitamin D3"],
    recentVisits: [
      { date: "2025-02-04", reason: "Thyroid Check", notes: "TSH levels normalized" },
      { date: "2024-12-08", reason: "General Check-up", notes: "Vitamin D levels improving" }
    ],
    profileImage: "/placeholder-user.jpg"
  },
  {
    id: 10,
    name: "Omar Benjelloun",
    age: 47,
    gender: "Male",
    phone: "+212 6XX-XXXXXX",
    email: "o.benjelloun@example.com",
    lastVisit: "2025-01-25",
    nextAppointment: "2025-02-19",
    medicalHistory: ["GERD", "Sleep Apnea"],
    medications: ["Omeprazole", "CPAP therapy"],
    recentVisits: [
      { date: "2025-01-25", reason: "GERD Follow-up", notes: "Symptoms well controlled" },
      { date: "2024-12-15", reason: "Sleep Apnea Review", notes: "CPAP compliance good" }
    ],
    profileImage: "/placeholder-user.jpg"
  },
  {
    id: 11,
    name: "Samira El Fassi",
    age: 33,
    gender: "Female",
    phone: "+212 6XX-XXXXXX",
    email: "s.elfassi@example.com",
    lastVisit: "2025-02-08",
    nextAppointment: "2025-03-02",
    medicalHistory: ["Endometriosis", "Depression"],
    medications: ["Hormonal therapy", "Sertraline"],
    recentVisits: [
      { date: "2025-02-08", reason: "Pain Management", notes: "New treatment plan discussed" },
      { date: "2024-12-20", reason: "Mental Health Review", notes: "Mood improving" }
    ],
    profileImage: "/placeholder-user.jpg"
  },
  {
    id: 12,
    name: "Rachid Alaoui",
    age: 55,
    gender: "Male",
    phone: "+212 6XX-XXXXXX",
    email: "r.alaoui@example.com",
    lastVisit: "2025-01-28",
    nextAppointment: "2025-02-21",
    medicalHistory: ["Osteoarthritis", "Glaucoma"],
    medications: ["NSAIDs", "Eye drops"],
    recentVisits: [
      { date: "2025-01-28", reason: "Joint Pain Follow-up", notes: "Mobility exercises recommended" },
      { date: "2024-12-18", reason: "Eye Pressure Check", notes: "Pressures stable" }
    ],
    profileImage: "/placeholder-user.jpg"
  }
];

export default function PatientsPage() {
  const router = useRouter();
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const PatientDetails = ({ patient }: { patient: any }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profileImage, setProfileImage] = useState<string>(patient.profileImage || "");

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result as string);
          // Here you would typically upload the image to your backend
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <button
          onClick={() => setSelectedPatient(null)}
          className="flex items-center text-blue-600 mb-4 hover:text-blue-700"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Patients List
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  {profileImage ? (
                    <Image 
                      src={profileImage} 
                      alt={`${patient.name}'s profile`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1.5 text-white hover:bg-blue-700"
                  title="Upload profile picture"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-600">Age: {patient.age}</p>
                  <p className="text-gray-600">Gender: {patient.gender}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <span>{patient.email}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Medical History</h3>
              <ul className="list-disc list-inside space-y-1">
                {patient.medicalHistory.map((condition: string, index: number) => (
                  <li key={index} className="text-gray-600">{condition}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Current Medications</h3>
              <ul className="list-disc list-inside space-y-1">
                {patient.medications.map((medication: string, index: number) => (
                  <li key={index} className="text-gray-600">{medication}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Appointments</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Last Visit: {patient.lastVisit}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Next Appointment: {patient.nextAppointment}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Recent Visits</h3>
              <div className="space-y-4">
                {patient.recentVisits.map((visit: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{visit.date}</span>
                      <span className="text-sm text-gray-500">{visit.reason}</span>
                    </div>
                    <p className="text-sm text-gray-600">{visit.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const PatientsList = () => (
    <div className="space-y-4">
      {console.log('Number of patients:', patientsData.length)}
      {patientsData.slice(0, 12).map((patient) => (
        <motion.div
          key={patient.id}
          whileHover={{ scale: 1.01 }}
          onClick={() => setSelectedPatient(patient)}
          className="bg-white p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-50 rounded-full">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{patient.name}</h3>
                <p className="text-sm text-gray-500">Last visit: {patient.lastVisit}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">Next: {patient.nextAppointment}</p>
              <p className="text-xs text-gray-500">{patient.medicalHistory.join(", ")}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Patients</h1>
      {selectedPatient ? (
        <PatientDetails patient={selectedPatient} />
      ) : (
        <PatientsList />
      )}
    </div>
  );
}
