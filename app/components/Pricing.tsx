"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const tiers = [
  {
    name: "Free",
    href: "#",
    priceMonthly: 0,
    description: "Basic features for growing healthcare practices",
    features: [
      "Basic medical record",
      "Qr Code generation",
      "Blockchain security",
      "24/7 priority support",
      "Custom integrations",
    ],
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/30",
    bgGlow: "bg-blue-500/5",
  },
  {
    name: "Premium",
    href: "#",
    priceMonthly: 20,
    description: "Comprehensive solution for large healthcare organizations",
    features: [
      "Unlimited patient records",
      "Advanced AI analytics with custom reporting",
      "Blockchain security with audit trails",
      "Dedicated account manager",
      "Custom AI model training",
      "On-premise deployment option",
      "HIPAA and GDPR compliant",
    ],
    gradient: "from-green-500 to-emerald-500",
    shadow: "shadow-green-500/30",
    bgGlow: "bg-green-500/5",
    popular: true,
  },
  {
    name: "Global",
    href: "#",
    priceMonthly: "Custom",
    description: "Tailored solutions for multinational healthcare networks",
    features: [
      "Global data management",
      "Multi-language support",
      "Cross-border compliance",
      "Advanced telemedicine features",
      "24/7 global support team",
      "Custom AI and blockchain solutions",
      "Comprehensive staff training",
    ],
    gradient: "from-purple-500 to-indigo-500",
    shadow: "shadow-purple-500/30",
    bgGlow: "bg-purple-500/5",
  },
]

export default function Pricing() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)

  return (
    <section className="relative py-24 overflow-hidden" id="pricing">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
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
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Enterprise-Grade Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that best suits your organization's needs. All plans include a 30-day free trial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredTier(tier.name)}
              onHoverEnd={() => setHoveredTier(null)}
              className={`relative group rounded-2xl ${
                tier.name === 'Global' ? 'bg-gradient-to-b from-slate-900 to-slate-800' : 'bg-white'
              } ${
                hoveredTier === tier.name ? 'scale-[1.02]' : 'scale-100'
              } transition-all duration-300 ${tier.bgGlow}`}
              style={{
                transformStyle: 'preserve-3d',
                transform: hoveredTier === tier.name 
                  ? 'translateZ(20px) rotateX(2deg)' 
                  : 'translateZ(0) rotateX(0)',
                perspective: '1000px'
              }}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-6 left-0 right-0 mx-auto w-32 z-10">
                  <div className="relative flex items-center justify-center animate-gentle-float">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-75"></div>
                    <div className="relative flex items-center justify-center px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white text-sm font-semibold shadow-lg">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                </div>
              )}

              {/* Animated corner decorations */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className={`absolute top-[40%] right-[40%] w-2 h-2 rounded-full bg-gradient-to-r ${tier.gradient} animate-ping`}></div>
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden">
                <div className={`absolute bottom-[40%] left-[40%] w-2 h-2 rounded-full bg-gradient-to-r ${tier.gradient} animate-ping animation-delay-1000`}></div>
              </div>

              {/* Card glow effect */}
              <div 
                className={`absolute -inset-[2px] bg-gradient-to-r ${tier.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-700`}
              />
              
              {/* Card content */}
              <div 
                className={`relative h-full p-8 rounded-2xl ${
                  tier.name === 'Global' 
                    ? 'bg-gradient-to-b from-slate-900 to-slate-800 backdrop-blur-sm border-slate-700' 
                    : 'bg-white/90 backdrop-blur-sm border-gray-200'
                } border shadow-lg group-hover:shadow-2xl group-hover:shadow-${tier.shadow} transition-all duration-700`}
              >
                {/* Subtle animated gradient background */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-r ${tier.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-all duration-700 animate-subtle-gradient`}
                />
                
                <div className="flex flex-col h-full relative z-10">
                  {/* Header */}
                  <div className="mb-8">
                    <h3 
                      className={`inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-gradient-to-r ${tier.gradient} text-white transform group-hover:scale-105 transition-all duration-500`}
                    >
                      {tier.name}
                    </h3>
                    <div className="mt-4 flex items-baseline">
                      {typeof tier.priceMonthly === "number" ? (
                        <div className="flex items-end transition-all duration-500">
                          <span className={`text-5xl font-extrabold ${
                            tier.name === 'Global' ? 'text-white' : 'text-gray-900'
                          }`}>${tier.priceMonthly}</span>
                          <span className={`ml-1 text-xl font-medium ${
                            tier.name === 'Global' ? 'text-gray-400' : 'text-gray-500'
                          }`}>/mo</span>
                        </div>
                      ) : (
                        <span className={`text-4xl font-bold ${
                          tier.name === 'Global' ? 'text-white' : 'text-gray-900'
                        }`}>{tier.priceMonthly}</span>
                      )}
                    </div>
                    <p className={`mt-4 text-lg ${
                      tier.name === 'Global' ? 'text-gray-300' : 'text-gray-600'
                    }`}>{tier.description}</p>
                  </div>

                  {/* Features */}
                  <div className="flex-grow">
                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature}
                          className="flex items-start"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.5,
                            delay: featureIndex * 0.1,
                            ease: "easeOut"
                          }}
                        >
                          <div className={`flex-shrink-0 p-1 rounded-full bg-gradient-to-r ${tier.gradient} group-hover:scale-110 transition-all duration-500`}>
                            <Check className="h-5 w-5 text-white" aria-hidden="true" />
                          </div>
                          <p className={`ml-3 text-base ${
                            tier.name === 'Global' ? 'text-gray-300' : 'text-gray-600'
                          }`}>{feature}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="relative group/btn">
                    <div className={`absolute -inset-[2px] bg-gradient-to-r ${tier.gradient} rounded-lg opacity-70 group-hover/btn:opacity-100 blur transition-all duration-500`} />
                    <Button
                      asChild
                      className={`relative w-full bg-gradient-to-r ${tier.gradient} hover:opacity-90 transition-all duration-500 text-white font-semibold py-3 rounded-lg group-hover:scale-[1.02] ${
                        tier.name === 'Global' ? 'border border-slate-700' : ''
                      }`}
                    >
                      <a href={tier.href} className="flex items-center justify-center overflow-hidden">
                        <span className="relative z-10">Get started</span>
                        <span className="ml-2 relative z-10 transform translate-x-0 group-hover:translate-x-1 opacity-0 group-hover:opacity-100 transition-all duration-500">→</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
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
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes sparkle {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes gradient-xy {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes wiggle {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-1deg); }
          75% { transform: rotate(1deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          75% { transform: scale(1.2); opacity: 0.5; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes gentle-float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        @keyframes subtle-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-sparkle {
          animation: sparkle 1.5s ease-in-out infinite;
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        .animate-gradient-xy {
          background-size: 400% 400%;
          animation: gradient-xy 15s ease infinite;
        }
        .animate-wiggle {
          animation: wiggle 0.3s ease-in-out infinite;
        }
        .animate-ping {
          animation: ping 2s ease-in-out infinite;
        }
        .animate-gentle-float {
          animation: gentle-float 4s ease-in-out infinite;
        }
        .animate-subtle-gradient {
          background-size: 200% 200%;
          animation: subtle-gradient 8s ease infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
