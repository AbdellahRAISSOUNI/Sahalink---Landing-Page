"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Search, Filter, Plus } from 'lucide-react';

const documentsData = [
  {
    id: 1,
    title: "Sarah Johnson - Medical Report",
    type: "Medical Report",
    patient: "Sarah Johnson",
    date: "2025-02-01",
    size: "1.2 MB"
  },
  {
    id: 2,
    title: "Mohammed Ahmed - Lab Results",
    type: "Lab Results",
    patient: "Mohammed Ahmed",
    date: "2025-01-28",
    size: "2.8 MB"
  },
  {
    id: 3,
    title: "Fatima El Amrani - Prescription",
    type: "Prescription",
    patient: "Fatima El Amrani",
    date: "2025-02-05",
    size: "0.5 MB"
  }
];

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Documents</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Document
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="font-semibold mb-4">Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-2">Document Type</label>
                <select className="w-full rounded-lg border-gray-300">
                  <option>All Types</option>
                  <option>Medical Reports</option>
                  <option>Lab Results</option>
                  <option>Prescriptions</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">Date Range</label>
                <select className="w-full rounded-lg border-gray-300">
                  <option>All Time</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 3 Months</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="space-y-4">
              {documentsData.map((doc) => (
                <motion.div
                  key={doc.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-50 rounded-full">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{doc.title}</h3>
                      <p className="text-sm text-gray-500">
                        {doc.patient} • {doc.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{doc.size}</span>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Download className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
