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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-3xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-3 right-3 p-2 rounded-xl hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Patient QR Code</h3>
                <p className="text-sm text-gray-500 mt-1">{patientInfo.name}</p>
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

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#f2f7f5] via-[#edf6f3] to-[#e8f5f1] rounded-[40px] shadow-2xl p-6 relative overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#e6f3ef] to-[#e1f1ec] rounded-full blur-3xl opacity-20 -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-[#e8f5f1] to-[#e3f2ee] rounded-full blur-3xl opacity-20 -ml-32 -mb-32" />

        {/* Header */}
        <div className="flex items-start justify-between mb-8 relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-24 h-24 rounded-3xl overflow-hidden bg-gradient-to-br from-[#e6f3ef] to-[#e1f1ec] shadow-lg">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white/70" />
                  </div>
                )}
                <motion.button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="text-white text-sm font-medium"
                  >
                    Change
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
            
            <div>
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold text-gray-800 mb-1"
              >
                {patientInfo.name}
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-sm text-[#2d6a4f]"
              >
                <Shield className="w-3.5 h-3.5 mr-1.5 text-[#40916c]" />
                <span>{patientInfo.nationalId}</span>
              </motion.div>
            </div>
          </motion.div>

          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerateQR}
              className="group relative px-4 py-2.5 bg-white rounded-2xl text-[#2d6a4f] hover:shadow-lg transition-all duration-300 flex items-center space-x-2 border border-[#40916c]/10"
            >
              <QRCodeSVG value="" size={18} className="text-[#40916c]" />
              <span className="text-sm font-medium">QR Code</span>
              <span className="absolute inset-0 rounded-2xl bg-[#40916c]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            {onEmergency && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onEmergency}
                className="group relative px-4 py-2.5 bg-rose-500 rounded-2xl text-white hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">Emergency</span>
                <span className="absolute inset-0 rounded-2xl bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            )}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {infoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -2 }}
                key={item.label}
                className="group p-4 bg-white/60 backdrop-blur-sm rounded-3xl hover:bg-white/80 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-gradient-to-br from-[#40916c] to-[#52b788] rounded-2xl text-white shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-[#2d6a4f]">
                      {item.label}
                    </p>
                    <p className="font-semibold text-gray-900">
                      {item.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Users className="w-5 h-5 mr-2 text-[#40916c]" />
              Emergency Contacts
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#40916c]/20 to-[#52b788]/20" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patientInfo.emergencyContacts.map((contact, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * index }}
                whileHover={{ scale: 1.02 }}
                key={index}
                className="group p-4 bg-white/60 backdrop-blur-sm rounded-3xl hover:bg-white/80 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-800">
                        {contact.name}
                      </p>
                      <span className="px-2 py-0.5 bg-[#40916c]/10 text-[#2d6a4f] rounded-full text-xs">
                        {contact.relation}
                      </span>
                    </div>
                    {contact.phone && (
                      <p className="text-sm text-[#2d6a4f] mt-1">
                        {contact.phone}
                      </p>
                    )}
                  </div>
                  {contact.phone && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={`tel:${contact.phone}`}
                      className="p-2 bg-gradient-to-br from-[#40916c] to-[#52b788] rounded-xl text-white shadow-sm"
                    >
                      <Phone className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

    </>
  );
};

export default ProfileCard;
