"use client"

import { QRCodeSVG } from 'qrcode.react';

interface QRCodeGeneratorProps {
  patientData: {
    name: string;
    bloodType: string;
    emergencyContact: string;
    allergies: { name: string; severity: string }[];
    medications: { name: string; dosage: string }[];
  };
}

const QRCodeGenerator = ({ patientData }: QRCodeGeneratorProps) => {
  const medicalData = {
    name: patientData.name,
    emergencyInfo: {
      bloodType: patientData.bloodType,
      emergencyContact: patientData.emergencyContact
    },
    allergies: patientData.allergies,
    currentMedications: patientData.medications
  };

  const qrCodeData = JSON.stringify(medicalData);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Medical Record QR Code</h3>
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <QRCodeSVG
            value={qrCodeData}
            size={200}
            level="H"
            includeMargin={true}
            className="mx-auto"
          />
        </div>
        <div className="text-sm text-gray-600 text-center">
          Scan this QR code to access emergency medical information
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
