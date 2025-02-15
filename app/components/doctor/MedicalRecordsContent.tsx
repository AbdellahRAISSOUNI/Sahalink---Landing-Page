"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Plus, Download } from 'lucide-react';

export default function MedicalRecordsContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [records] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      patientId: 'P001',
      date: '2025-02-14',
      type: 'Consultation',
      diagnosis: 'Hypertension',
      status: 'Complete',
      bloodPressure: '140/90',
      temperature: '37.2°C',
      weight: '68 kg',
      medications: ['Lisinopril 10mg', 'Amlodipine 5mg'],
      allergies: ['Penicillin'],
      notes: 'Patient reports occasional headaches. Advised to monitor blood pressure daily.',
      attachments: ['blood_work.pdf', 'ecg_report.pdf']
    },
    {
      id: 2,
      patientName: 'Mohammed Ahmed',
      patientId: 'P002',
      date: '2025-02-13',
      type: 'Lab Results',
      diagnosis: 'Diabetes Type 2',
      status: 'Pending',
      bloodPressure: '130/85',
      temperature: '36.8°C',
      weight: '75 kg',
      medications: ['Metformin 1000mg', 'Glimepiride 2mg'],
      allergies: ['None'],
      notes: 'HbA1c levels elevated. Adjusting medication dosage.',
      attachments: ['lab_results.pdf']
    },
    {
      id: 3,
      patientName: 'Fatima El Amrani',
      patientId: 'P003',
      date: '2025-02-12',
      type: 'Follow-up',
      diagnosis: 'Chronic Back Pain',
      status: 'Complete',
      bloodPressure: '120/80',
      temperature: '36.9°C',
      weight: '62 kg',
      medications: ['Tramadol 50mg', 'Cyclobenzaprine 10mg'],
      allergies: ['Sulfa drugs'],
      notes: 'Physical therapy showing improvement. Continue current treatment plan.',
      attachments: ['mri_report.pdf', 'physio_notes.pdf']
    },
    {
      id: 4,
      patientName: 'Youssef Benali',
      patientId: 'P004',
      date: '2025-02-11',
      type: 'Emergency',
      diagnosis: 'Acute Bronchitis',
      status: 'Complete',
      bloodPressure: '125/85',
      temperature: '38.5°C',
      weight: '70 kg',
      medications: ['Azithromycin 500mg', 'Salbutamol inhaler'],
      allergies: ['None'],
      notes: 'Severe coughing and wheezing. Prescribed antibiotics and bronchodilator.',
      attachments: ['chest_xray.pdf']
    }
  ]);

  const filterOptions = [
    { value: 'all', label: 'All Records' },
    { value: 'consultation', label: 'Consultations' },
    { value: 'lab', label: 'Lab Results' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'follow-up', label: 'Follow-ups' }
  ];

  const filteredRecords = records.filter(record =>
    (selectedFilter === 'all' || record.type.toLowerCase().includes(selectedFilter)) &&
    (record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by patient name, ID, or diagnosis..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select
            className="flex-1 md:flex-none px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            <Plus size={20} />
            New Record
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{record.patientName}</h3>
                    <span className="text-sm text-gray-500">ID: {record.patientId}</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      record.status === 'Complete' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(record.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <FileText size={20} />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Blood Pressure</div>
                  <div className="text-lg font-semibold">{record.bloodPressure}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Temperature</div>
                  <div className="text-lg font-semibold">{record.temperature}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Weight</div>
                  <div className="text-lg font-semibold">{record.weight}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Type</div>
                  <div className="text-lg font-semibold">{record.type}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Diagnosis</h4>
                  <p className="text-gray-700">{record.diagnosis}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Medications</h4>
                  <div className="flex flex-wrap gap-2">
                    {record.medications.map((med, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {med}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Allergies</h4>
                  <div className="flex flex-wrap gap-2">
                    {record.allergies.map((allergy, index) => (
                      <span key={index} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Notes</h4>
                  <p className="text-gray-700">{record.notes}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Attachments</h4>
                  <div className="flex flex-wrap gap-2">
                    {record.attachments.map((file, index) => (
                      <button
                        key={index}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100"
                      >
                        <FileText size={16} />
                        <span className="text-sm">{file}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
