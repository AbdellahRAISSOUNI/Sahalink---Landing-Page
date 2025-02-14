"use client"

import { motion } from 'framer-motion';
import { File, Download, Upload, Trash2 } from 'lucide-react';

export default function DocumentsContent() {
  const documents = [
    { id: 1, name: 'Patient Records - Jan 2025.pdf', type: 'PDF', size: '2.4 MB', date: '2025-01-15' },
    { id: 2, name: 'Medical Certificates.docx', type: 'DOCX', size: '1.1 MB', date: '2025-02-01' },
    { id: 3, name: 'Lab Results.xlsx', type: 'XLSX', size: '856 KB', date: '2025-02-10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Documents</h2>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </motion.button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <motion.div
                key={doc.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 border rounded-lg hover:border-blue-400 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <File className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-800">{doc.name}</h3>
                      <p className="text-sm text-gray-500">
                        {doc.type} • {doc.size}
                      </p>
                      <p className="text-sm text-gray-500">{doc.date}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
