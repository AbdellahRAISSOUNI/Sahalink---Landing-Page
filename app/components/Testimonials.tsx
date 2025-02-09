"use client"

import { motion } from "framer-motion"

export default function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50" id="testimonials">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pink-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-green-600 bg-green-50 rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Healthcare Leaders
          </h2>
          <p className="text-xl text-gray-600">
            See what medical professionals are saying about WaslMed
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-green-100/50 to-blue-100/50 rounded-3xl blur-2xl opacity-30" />
          
          <blockquote className="relative bg-white rounded-2xl shadow-xl p-12 backdrop-blur-sm bg-white/80">
            <div className="absolute top-0 left-0 -translate-x-4 -translate-y-4 h-20 w-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 blur-2xl" />
            <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 h-20 w-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-20 blur-2xl" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-10"
            >
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-2xl md:text-3xl leading-relaxed text-gray-900 font-medium">
                  &ldquo;WaslMed has revolutionized our patient record management. We've seen a 30% increase in
                  efficiency and a significant improvement in patient care since implementing their platform. It's
                  intuitive, secure, and exactly what we needed to modernize our healthcare delivery.&rdquo;
                </p>
              </div>

              <footer className="mt-8">
                <motion.div 
                  className="md:flex md:items-center md:justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="md:flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-lg opacity-30" />
                    <img className="mx-auto h-12 w-12 rounded-full object-cover relative" src="/dr-lee.png" alt="Dr. Lee" />
                  </div>
                  <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                    <div className="text-lg font-semibold text-gray-900">Dr. Emily Chen</div>
                    <svg className="hidden md:block mx-1 h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 0h3L9 20H6l5-20z" />
                    </svg>
                    <div className="text-base font-medium text-gray-500">Chief of Medicine, Metro Hospital</div>
                  </div>
                </motion.div>
              </footer>
            </motion.div>
          </blockquote>
        </motion.div>
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
