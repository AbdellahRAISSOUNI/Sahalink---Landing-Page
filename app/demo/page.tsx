"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Stethoscope, User } from 'lucide-react';

export default function DemoPage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleCardClick = (type: 'doctor' | 'patient') => {
    router.push(`/demo/${type}`);
  };

  const cardVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    initial: { y: 0 },
    hover: { 
      y: -5,
      transition: { duration: 0.2, repeat: Infinity, repeatType: "reverse" }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-6xl w-full">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800"
        >
          Choose Your Role
        </motion.h1>
        
        <div className="grid md:grid-cols-2 gap-8 px-4">
          {/* Doctor Card */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            onClick={() => handleCardClick('doctor')}
            onHoverStart={() => setHoveredCard('doctor')}
            onHoverEnd={() => setHoveredCard(null)}
            className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer border-2 border-transparent hover:border-blue-500 transition-colors duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                variants={iconVariants}
                className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-6"
              >
                <Stethoscope size={48} className="text-blue-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">I'm a Healthcare Provider</h2>
              <p className="text-gray-600 mb-6">
                Join our network of healthcare professionals and enhance your practice with our innovative solutions.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue as Doctor
              </motion.button>
            </div>
          </motion.div>

          {/* Patient Card */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            onClick={() => handleCardClick('patient')}
            onHoverStart={() => setHoveredCard('patient')}
            onHoverEnd={() => setHoveredCard(null)}
            className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer border-2 border-transparent hover:border-green-500 transition-colors duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                variants={iconVariants}
                className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6"
              >
                <User size={48} className="text-green-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">I'm a Patient</h2>
              <p className="text-gray-600 mb-6">
                Access quality healthcare services and manage your health journey with ease.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
              >
                Continue as Patient
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
