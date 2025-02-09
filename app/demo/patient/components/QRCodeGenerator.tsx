"use client"

import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2 } from 'lucide-react';

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

  const handleDownload = () => {
    const svg = document.querySelector('.qr-code-svg') as SVGElement;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `medical-qr-${patientData.name}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleShare = async () => {
    try {
      const svg = document.querySelector('.qr-code-svg') as SVGElement;
      if (!svg) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          
          if (navigator.share) {
            try {
              await navigator.share({
                files: [new File([blob], 'medical-qr.png', { type: 'image/png' })],
                title: 'Medical QR Code',
                text: 'My Medical QR Code'
              });
            } catch (error) {
              console.error('Error sharing:', error);
            }
          }
        }, 'image/png');
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    } catch (error) {
      console.error('Error preparing share:', error);
    }
  };

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
            className="mx-auto qr-code-svg"
          />
        </div>
        <div className="text-sm text-gray-600 text-center mb-4">
          Scan this QR code to access emergency medical information
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleDownload}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </button>
          <button
            onClick={handleShare}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
