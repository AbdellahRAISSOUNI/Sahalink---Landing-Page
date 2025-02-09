"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { 
  User, 
  Phone, 
  Calendar, 
  Heart, 
  Activity,
  Languages,
  Shield,
  UserCircle,
  Building2,
  Flag,
  Users,
  X
} from "lucide-react";

interface PatientInfo {
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  height: string;
  weight: string;
  nationalId: string;
  dateOfBirth: string;
  maritalStatus: string;
  occupation: string;
  insurance: string;
  nationality: string;
  languages: string[];
  emergencyContacts: {
    name: string;
    relation: string;
    phone?: string;
  }[];
}

interface ProfileCardProps {
  patientInfo: PatientInfo;
  onGenerateQR?: () => void;
  onEmergency?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  patientInfo,
  onGenerateQR,
  onEmergency 
}) => {
  const [profileImage, setProfileImage] = React.useState<string>("");
  const [showQR, setShowQR] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem("profileImage", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateQR = () => {
    setShowQR(true);
    if (onGenerateQR) {
      onGenerateQR();
    }
  };

  const infoItems = [
    { icon: Calendar, label: "Age", value: `${patientInfo.age} years` },
    { icon: UserCircle, label: "Gender", value: patientInfo.gender },
    { icon: Heart, label: "Blood Type", value: patientInfo.bloodType },
    { icon: Activity, label: "Height/Weight", value: `${patientInfo.height} / ${patientInfo.weight}` },
    { icon: Shield, label: "Insurance", value: patientInfo.insurance },
    { icon: Building2, label: "Occupation", value: patientInfo.occupation },
    { icon: Flag, label: "Nationality", value: patientInfo.nationality },
    { icon: Languages, label: "Languages", value: patientInfo.languages.join(", ") },
  ];

  const patientQRData = {
    id: patientInfo.nationalId,
    name: patientInfo.name,
    bloodType: patientInfo.bloodType,
    emergencyContact: patientInfo.emergencyContacts[0]
  };

  return (
    <>
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Patient QR Code</h3>
                <p className="text-sm text-gray-500">{patientInfo.name}</p>
              </div>
              <QRCodeSVG
                value={JSON.stringify(patientQRData)}
                size={200}
                level="H"
                includeMargin
                className="mx-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-colors rounded-full group"
              >
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                  Change Photo
                </span>
              </button>
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Content Section */}
        <div className="pt-20 px-8 pb-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">{patientInfo.name}</h2>
            <p className="text-gray-500">ID: {patientInfo.nationalId}</p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {infoItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="bg-gray-50 p-4 rounded-xl flex items-start space-x-3"
                >
                  <div className="rounded-full p-2 bg-white">
                    <Icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="font-medium text-gray-900">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-gray-600" />
              Emergency Contacts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patientInfo.emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-xl space-y-2"
                >
                  <p className="font-medium text-gray-800">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.relation}</p>
                  {contact.phone && (
                    <p className="text-sm text-gray-600 flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {contact.phone}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
