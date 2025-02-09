"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Phone, Mail, Calendar, Clock, FileText, Activity, 
  ChevronLeft, Search, Filter, MapPin, AlertCircle 
} from 'lucide-react';
import Image from 'next/image';

const patientsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    phone: "+212 6XX-XXXXXX",
    email: "sarah.j@example.com",
    address: "123 Main St, Casablanca",
    image: "/patients/patient1.jpg",
    bloodType: "A+",
    lastVisit: "2025-02-01",
    nextAppointment: "2025-02-15",
    insurance: "CNSS",
    status: "Active",
    medicalHistory: ["Hypertension", "Allergies"],
    medications: ["Lisinopril 10mg", "Antihistamine"],
    allergies: ["Penicillin", "Pollen"],
    recentVisits: [
      { date: "2025-02-01", reason: "Regular Checkup", notes: "Blood pressure normal", doctor: "Dr. Smith" },
      { date: "2024-12-15", reason: "Flu Symptoms", notes: "Prescribed antibiotics", doctor: "Dr. Johnson" }
    ],
    vitals: {
      bloodPressure: "120/80",
      heartRate: "72 bpm",
      temperature: "37.0°C",
      weight: "65 kg",
      height: "168 cm",
      bmi: "23.0"
    }
  },
  {
    id: 2,
    name: "Mohammed Ahmed",
    age: 45,
    gender: "Male",
    phone: "+212 6XX-XXXXXX",
    email: "m.ahmed@example.com",
    address: "456 Park Ave, Rabat",
    image: "/patients/patient2.jpg",
    bloodType: "O+",
    lastVisit: "2025-01-28",
    nextAppointment: "2025-02-20",
    insurance: "RAMED",
    status: "Active",
    medicalHistory: ["Type 2 Diabetes", "High Cholesterol"],
    medications: ["Metformin 500mg", "Statins"],
    allergies: ["Sulfa drugs"],
    recentVisits: [
      { date: "2025-01-28", reason: "Diabetes Follow-up", notes: "A1C levels improved", doctor: "Dr. Smith" },
      { date: "2024-12-20", reason: "Annual Physical", notes: "Overall health stable", doctor: "Dr. Wilson" }
    ],
    vitals: {
      bloodPressure: "130/85",
      heartRate: "76 bpm",
      temperature: "36.8°C",
      weight: "82 kg",
      height: "175 cm",
      bmi: "26.8"
    }
  },
  {
    id: 3,
    name: "Fatima El Amrani",
    age: 28,
    gender: "Female",
    phone: "+212 6XX-XXXXXX",
    email: "f.elamrani@example.com",
    address: "789 Ocean Blvd, Tangier",
    image: "/patients/patient3.jpg",
    bloodType: "B-",
    lastVisit: "2025-02-05",
    nextAppointment: "2025-03-01",
    insurance: "Private",
    status: "Active",
    medicalHistory: ["Asthma"],
    medications: ["Albuterol inhaler"],
    allergies: ["Dust", "Pet dander"],
    recentVisits: [
      { date: "2025-02-05", reason: "Asthma Follow-up", notes: "Breathing improved", doctor: "Dr. Smith" },
      { date: "2024-11-15", reason: "Respiratory Issues", notes: "New inhaler prescribed", doctor: "Dr. Brown" }
    ],
    vitals: {
      bloodPressure: "118/75",
      heartRate: "68 bpm",
      temperature: "36.9°C",
      weight: "58 kg",
      height: "162 cm",
      bmi: "22.1"
    }
  },
  {
    id: 4,
    name: "Youssef Benali",
    age: 52,
    gender: "Male",
    phone: "+212 6XX-XXXXXX",
    email: "y.benali@example.com",
    address: "321 Valley Road, Marrakech",
    image: "/patients/patient4.jpg",
    bloodType: "AB+",
    lastVisit: "2025-02-03",
    nextAppointment: "2025-02-25",
    insurance: "CNSS",
    status: "Active",
    medicalHistory: ["Arthritis", "Hypertension"],
    medications: ["Diclofenac 50mg", "Amlodipine 5mg"],
    allergies: ["Aspirin"],
    recentVisits: [
      { date: "2025-02-03", reason: "Joint Pain", notes: "Prescribed new pain management regime", doctor: "Dr. Smith" },
      { date: "2024-12-10", reason: "Blood Pressure Check", notes: "BP slightly elevated", doctor: "Dr. Wilson" }
    ],
    vitals: {
      bloodPressure: "135/85",
      heartRate: "74 bpm",
      temperature: "36.7°C",
      weight: "78 kg",
      height: "172 cm",
      bmi: "26.4"
    }
  },
  {
    id: 5,
    name: "Amina Tazi",
    age: 35,
    gender: "Female",
    phone: "+212 6XX-XXXXXX",
    email: "a.tazi@example.com",
    address: "567 Garden Street, Fez",
    image: "/patients/patient5.jpg",
    bloodType: "O-",
    lastVisit: "2025-02-07",
    nextAppointment: "2025-02-28",
    insurance: "Private",
    status: "Active",
    medicalHistory: ["Migraine", "Anxiety"],
    medications: ["Sumatriptan", "Escitalopram"],
    allergies: ["Latex"],
    recentVisits: [
      { date: "2025-02-07", reason: "Migraine Follow-up", notes: "Frequency of episodes reduced", doctor: "Dr. Brown" },
      { date: "2024-12-22", reason: "Mental Health Check", notes: "Showing improvement", doctor: "Dr. Smith" }
    ],
    vitals: {
      bloodPressure: "115/75",
      heartRate: "70 bpm",
      temperature: "36.8°C",
      weight: "62 kg",
      height: "165 cm",
      bmi: "22.8"
    }
  },
  {
    id: 6,
    name: "Karim Idrissi",
    age: 41,
    gender: "Male",
    phone: "+212 6XX-XXXXXX",
    email: "k.idrissi@example.com",
    address: "890 Mountain View, Agadir",
    image: "/patients/patient6.jpg",
    bloodType: "A-",
    lastVisit: "2025-01-30",
    nextAppointment: "2025-02-22",
    insurance: "RAMED",
    status: "Active",
    medicalHistory: ["Lower Back Pain", "Insomnia"],
    medications: ["Cyclobenzaprine", "Melatonin"],
    allergies: ["None"],
    recentVisits: [
      { date: "2025-01-30", reason: "Back Pain Follow-up", notes: "Physical therapy recommended", doctor: "Dr. Wilson" },
      { date: "2024-12-18", reason: "Sleep Study Results", notes: "Sleep hygiene discussed", doctor: "Dr. Brown" }
    ],
    vitals: {
      bloodPressure: "125/82",
      heartRate: "72 bpm",
      temperature: "36.9°C",
      weight: "75 kg",
      height: "178 cm",
      bmi: "23.7"
    }
  },
  {
    id: 7,
    name: "Laila Moussaoui",
    age: 29,
    gender: "Female",
    phone: "+212 6XX-XXXXXX",
    email: "l.moussaoui@example.com",
    address: "432 Beach Road, Essaouira",
    image: "/patients/patient7.jpg",
    bloodType: "B+",
    lastVisit: "2025-02-06",
    nextAppointment: "2025-03-05",
    insurance: "CNSS",
    status: "Active",
    medicalHistory: ["PCOS", "Iron Deficiency"],
    medications: ["Birth Control", "Iron Supplements"],
    allergies: ["Shellfish"],
    recentVisits: [
      { date: "2025-02-06", reason: "Hormonal Check", notes: "Hormone levels stabilizing", doctor: "Dr. Smith" },
      { date: "2024-12-05", reason: "Blood Work", notes: "Iron levels improving", doctor: "Dr. Wilson" }
    ],
    vitals: {
      bloodPressure: "110/70",
      heartRate: "68 bpm",
      temperature: "37.0°C",
      weight: "57 kg",
      height: "160 cm",
      bmi: "22.3"
    }
  },
  {
    id: 8,
    name: "Hassan Ouazzani",
    age: 63,
    gender: "Male",
    phone: "+212 6XX-XXXXXX",
    email: "h.ouazzani@example.com",
    address: "765 Old Town, Meknes",
    image: "/patients/patient8.jpg",
    bloodType: "A+",
    lastVisit: "2025-02-02",
    nextAppointment: "2025-02-18",
    insurance: "Private",
    status: "Active",
    medicalHistory: ["Coronary Artery Disease", "Type 2 Diabetes"],
    medications: ["Aspirin", "Metformin", "Atorvastatin"],
    allergies: ["Iodine"],
    recentVisits: [
      { date: "2025-02-02", reason: "Cardiac Follow-up", notes: "ECG shows stable rhythm", doctor: "Dr. Brown" },
      { date: "2024-12-12", reason: "Diabetes Check", notes: "Blood sugar well controlled", doctor: "Dr. Smith" }
    ],
    vitals: {
      bloodPressure: "128/78",
      heartRate: "70 bpm",
      temperature: "36.8°C",
      weight: "80 kg",
      height: "170 cm",
      bmi: "27.7"
    }
  },
  {
    id: 9,
    name: "Nadia Chaoui",
    age: 38,
    gender: "Female",
    phone: "+212 6XX-XXXXXX",
    email: "n.chaoui@example.com",
    address: "543 New City, Tetouan",
    image: "/patients/patient9.jpg",
    bloodType: "O+",
    lastVisit: "2025-02-04",
    nextAppointment: "2025-02-24",
    insurance: "CNSS",
    status: "Active",
    medicalHistory: ["Hypothyroidism", "Vitamin D Deficiency"],
    medications: ["Levothyroxine", "Vitamin D3"],
    allergies: ["None"],
    recentVisits: [
      { date: "2025-02-04", reason: "Thyroid Check", notes: "TSH levels normalized", doctor: "Dr. Wilson" },
      { date: "2024-12-08", reason: "General Check-up", notes: "Vitamin D levels improving", doctor: "Dr. Smith" }
    ],
    vitals: {
      bloodPressure: "120/75",
      heartRate: "65 bpm",
      temperature: "36.9°C",
      weight: "63 kg",
      height: "167 cm",
      bmi: "22.6"
    }
  },
  {
    id: 10,
    name: "Omar Benjelloun",
    age: 47,
    gender: "Male",
    phone: "+212 6XX-XXXXXX",
    email: "o.benjelloun@example.com",
    address: "987 Central District, Oujda",
    image: "/patients/patient10.jpg",
    bloodType: "B-",
    lastVisit: "2025-01-25",
    nextAppointment: "2025-02-19",
    insurance: "RAMED",
    status: "Active",
    medicalHistory: ["GERD", "Sleep Apnea"],
    medications: ["Omeprazole", "CPAP therapy"],
    allergies: ["Sulfa drugs"],
    recentVisits: [
      { date: "2025-01-25", reason: "GERD Follow-up", notes: "Symptoms well controlled", doctor: "Dr. Brown" },
      { date: "2024-12-15", reason: "Sleep Apnea Review", notes: "CPAP compliance good", doctor: "Dr. Smith" }
    ],
    vitals: {
      bloodPressure: "132/82",
      heartRate: "75 bpm",
      temperature: "36.7°C",
      weight: "85 kg",
      height: "180 cm",
      bmi: "26.2"
    }
  },
  {
    id: 11,
    name: "Samira El Fassi",
    age: 33,
    gender: "Female",
    phone: "+212 6XX-XXXXXX",
    email: "s.elfassi@example.com",
    address: "234 Medina, Safi",
    image: "/patients/patient11.jpg",
    bloodType: "AB-",
    lastVisit: "2025-02-08",
    nextAppointment: "2025-03-02",
    insurance: "Private",
    status: "Active",
    medicalHistory: ["Endometriosis", "Depression"],
    medications: ["Hormonal therapy", "Sertraline"],
    allergies: ["Penicillin"],
    recentVisits: [
      { date: "2025-02-08", reason: "Pain Management", notes: "New treatment plan discussed", doctor: "Dr. Smith" },
      { date: "2024-12-20", reason: "Mental Health Review", notes: "Mood improving", doctor: "Dr. Wilson" }
    ],
    vitals: {
      bloodPressure: "118/72",
      heartRate: "68 bpm",
      temperature: "37.0°C",
      weight: "60 kg",
      height: "163 cm",
      bmi: "22.6"
    }
  },
  {
    id: 12,
    name: "Rachid Alaoui",
    age: 55,
    gender: "Male",
    phone: "+212 6XX-XXXXXX",
    email: "r.alaoui@example.com",
    address: "876 Historic District, El Jadida",
    image: "/patients/patient12.jpg",
    bloodType: "O+",
    lastVisit: "2025-01-28",
    nextAppointment: "2025-02-21",
    insurance: "CNSS",
    status: "Active",
    medicalHistory: ["Osteoarthritis", "Glaucoma"],
    medications: ["NSAIDs", "Eye drops"],
    allergies: ["Codeine"],
    recentVisits: [
      { date: "2025-01-28", reason: "Joint Pain Follow-up", notes: "Mobility exercises recommended", doctor: "Dr. Brown" },
      { date: "2024-12-18", reason: "Eye Pressure Check", notes: "Pressures stable", doctor: "Dr. Smith" }
    ],
    vitals: {
      bloodPressure: "130/80",
      heartRate: "72 bpm",
      temperature: "36.8°C",
      weight: "76 kg",
      height: "173 cm",
      bmi: "25.4"
    }
  }
];

export default function PatientsContent() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    gender: "all",
    insurance: "all"
  });
  const [filteredPatients, setFilteredPatients] = useState(patientsData);

  useEffect(() => {
    const filtered = patientsData.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.phone.includes(searchTerm);
      
      const matchesStatus = filters.status === "all" || patient.status.toLowerCase() === filters.status;
      const matchesGender = filters.gender === "all" || patient.gender.toLowerCase() === filters.gender.toLowerCase();
      const matchesInsurance = filters.insurance === "all" || patient.insurance === filters.insurance;

      return matchesSearch && matchesStatus && matchesGender && matchesInsurance;
    });

    setFilteredPatients(filtered);
  }, [searchTerm, filters]);

  const PatientDetails = ({ patient }: { patient: any }) => (
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

      <div className="mb-6">
        <div className="flex items-start space-x-6">
          <div className="relative w-32 h-32 rounded-lg overflow-hidden">
            <Image
              src={patient.image}
              alt={patient.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
            <div className="mt-2 space-y-1">
              <p className="text-gray-600">Age: {patient.age} | Gender: {patient.gender}</p>
              <p className="text-gray-600">Blood Type: {patient.bloodType}</p>
              <p className="text-gray-600">Insurance: {patient.insurance}</p>
              <div className="flex items-center mt-2">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {patient.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <span>{patient.email}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                <span>{patient.address}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Vital Signs</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Blood Pressure</p>
                <p className="font-medium">{patient.vitals.bloodPressure}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Heart Rate</p>
                <p className="font-medium">{patient.vitals.heartRate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="font-medium">{patient.vitals.temperature}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">BMI</p>
                <p className="font-medium">{patient.vitals.bmi}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Medical History</h3>
            <ul className="list-disc list-inside space-y-1">
              {patient.medicalHistory.map((condition: string, index: number) => (
                <li key={index} className="text-gray-600">{condition}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Current Medications</h3>
            <ul className="list-disc list-inside space-y-1">
              {patient.medications.map((medication: string, index: number) => (
                <li key={index} className="text-gray-600">{medication}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Allergies</h3>
            <div className="flex flex-wrap gap-2">
              {patient.allergies.map((allergy: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  {allergy}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Recent Visits</h3>
            <div className="space-y-4">
              {patient.recentVisits.map((visit: any, index: number) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{visit.date}</span>
                    <span className="text-sm text-gray-500">{visit.doctor}</span>
                  </div>
                  <p className="text-sm text-gray-600">{visit.reason}</p>
                  <p className="text-sm text-gray-500 mt-1">{visit.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const PatientsList = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search patients by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <div className="flex gap-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select
            value={filters.insurance}
            onChange={(e) => setFilters({ ...filters, insurance: e.target.value })}
            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Insurance</option>
            <option value="CNSS">CNSS</option>
            <option value="RAMED">RAMED</option>
            <option value="Private">Private</option>
          </select>
        </div>
      </div>

      {/* Patients List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <motion.div
            key={patient.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedPatient(patient)}
            className="bg-white p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={patient.image}
                  alt={patient.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{patient.name}</h3>
                <p className="text-sm text-gray-500">{patient.age} years | {patient.gender}</p>
                <div className="flex items-center mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {patient.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Next Visit</p>
                <p className="font-medium">{patient.nextAppointment}</p>
              </div>
              <div>
                <p className="text-gray-500">Insurance</p>
                <p className="font-medium">{patient.insurance}</p>
              </div>
            </div>

            {patient.allergies.length > 0 && (
              <div className="mt-4 flex items-center text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-sm">Has allergies</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
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
