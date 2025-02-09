"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-48 left-0 w-[800px] h-[800px] bg-green-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute -top-48 right-0 w-[800px] h-[800px] bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-48 left-1/2 w-[800px] h-[800px] bg-pink-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 lg:flex items-center gap-8">
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="space-y-12 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-green-100/50 to-blue-100/50 rounded-2xl blur-3xl opacity-30 -z-10" />
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="block relative mb-2">
                    Revolutionize your
                    <div className="absolute -inset-1 bg-green-100 rounded-lg blur-2xl opacity-20" />
                  </span>
                  <span className="block gradient-text relative">
                    medical records
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg blur-2xl opacity-30" />
                  </span>
                </motion.h1>
                <motion.p
                  className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  WaslMed empowers healthcare providers with cutting-edge AI and blockchain technology to manage patient
                  data securely and efficiently. Experience the future of healthcare management.
                </motion.p>
                <motion.div 
                  className="mt-10 flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="rounded-md shadow-lg hover:shadow-2xl transition-all duration-300">
                    <Button 
                      asChild 
                      size="lg" 
                      className="relative px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold tracking-wide transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
                    >
                      <Link href="#cta" className="relative flex items-center gap-2">
                        <span className="relative z-10">Get Started</span>
                        <svg 
                          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                        <div className="absolute inset-0 bg-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </Link>
                    </Button>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="relative px-8 py-3 text-green-600 border-2 border-green-500 hover:bg-green-50 transition-all duration-300 group"
                  >
                    <Link href="#features" className="flex items-center gap-2">
                      <span>Learn more</span>
                      <svg 
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Feature highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    ),
                    title: "Secure Storage",
                    description: "End-to-end encryption for all medical records"
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    ),
                    title: "Easy Access",
                    description: "Instant access to patient records anytime"
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ),
                    title: "AI-Powered",
                    description: "Smart analytics and insights for better care"
                  }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="relative group p-4 bg-white/60 backdrop-blur-lg rounded-xl border border-gray-200 hover:border-green-200 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <div className="relative flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg text-green-600">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Image Section */}
          <motion.div 
            className="flex-1 relative px-4 sm:px-6 lg:px-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full h-[500px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover"
                src="/thumbnail.png"
                alt="WaslMed AI-powered dashboard"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
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
    </div>
  )
}
