"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Stethoscope, Shield, BarChart2, Users, Brain, Globe, ArrowRight } from "lucide-react"

const features = [
  {
    name: "Smart Health Analytics",
    description:
      "Advanced AI algorithms analyze patient data in real-time, providing actionable insights and personalized treatment recommendations.",
    icon: Brain,
    color: "from-violet-600 to-indigo-600",
    bgPattern: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.25) 0%, transparent 70%)",
    stats: ["98% accuracy", "Real-time analysis", "24/7 monitoring"],
  },
  {
    name: "Military-Grade Security",
    description: "Enterprise-level encryption and blockchain technology ensure your medical data remains private and tamper-proof.",
    icon: Shield,
    color: "from-rose-600 to-pink-600",
    bgPattern: "radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.25) 0%, transparent 70%)",
    stats: ["256-bit encryption", "HIPAA compliant", "Blockchain secured"],
  },
  {
    name: "Performance Analytics",
    description:
      "Comprehensive analytics dashboard with real-time KPIs, helping healthcare providers optimize their operations and patient care.",
    icon: BarChart2,
    color: "from-blue-600 to-cyan-600",
    bgPattern: "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.25) 0%, transparent 70%)",
    stats: ["15+ KPI metrics", "Custom reports", "Predictive insights"],
  },
  {
    name: "Global Healthcare Network",
    description:
      "Connect with healthcare providers worldwide, enabling seamless second opinions and specialist consultations.",
    icon: Globe,
    color: "from-emerald-600 to-teal-600",
    bgPattern: "radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.25) 0%, transparent 70%)",
    stats: ["190+ countries", "24/7 availability", "Instant connect"],
  },
  {
    name: "Advanced Diagnostics",
    description: "AI-powered diagnostic tools that assist healthcare providers in making accurate and timely diagnoses.",
    icon: Stethoscope,
    color: "from-amber-600 to-orange-600",
    bgPattern: "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.25) 0%, transparent 70%)",
    stats: ["99.9% accuracy", "Instant results", "Multi-condition"],
  },
  {
    name: "Telehealth Excellence",
    description: "State-of-the-art virtual consultation platform with HD video, secure messaging, and integrated health monitoring.",
    icon: Users,
    color: "from-green-600 to-emerald-600",
    bgPattern: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.25) 0%, transparent 70%)",
    stats: ["HD video quality", "End-to-end encrypted", "Smart scheduling"],
  },
]

export default function Features() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white" id="features">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-green-600 bg-green-50 rounded-full">
            Innovative Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Healthcare Practice
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Experience the future of healthcare with our innovative suite of features designed to elevate patient care and streamline operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredFeature(feature.name)}
              onHoverEnd={() => setHoveredFeature(null)}
              className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-opacity-95"
              style={{ 
                background: hoveredFeature === feature.name ? feature.bgPattern : 'white',
                boxShadow: hoveredFeature === feature.name ? `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 20px 0 ${feature.name === 'Smart Health Analytics' ? 'rgba(99, 102, 241, 0.3)' : 
                  feature.name === 'Military-Grade Security' ? 'rgba(244, 63, 94, 0.3)' :
                  feature.name === 'Performance Analytics' ? 'rgba(6, 182, 212, 0.3)' :
                  feature.name === 'Global Healthcare Network' ? 'rgba(20, 184, 166, 0.3)' :
                  feature.name === 'Advanced Diagnostics' ? 'rgba(245, 158, 11, 0.3)' :
                  'rgba(16, 185, 129, 0.3)'}` : ''
              }}
            >
              <div className={`absolute -top-5 left-8 w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl group-hover:shadow-${feature.color.split('-')[2]}/30`}>
                <feature.icon className="h-7 w-7 text-white" aria-hidden="true" />
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center group-hover:text-green-600 transition-colors duration-300">
                  {feature.name}
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {feature.stats.map((stat, statIndex) => (
                    <span
                      key={statIndex}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 group-hover:bg-opacity-50 transition-all duration-300"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </div>

              <motion.div
                className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r ${feature.color} rounded-b-2xl`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredFeature === feature.name ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
