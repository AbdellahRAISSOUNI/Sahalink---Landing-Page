"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ClipboardList, Shield, BarChart2, Users, Brain, Globe } from "lucide-react"

const features = [
  {
    name: "AI-Powered Record Management",
    description:
      "Leverage cutting-edge AI to efficiently manage and analyze patient records, reducing errors and saving time.",
    icon: Brain,
  },
  {
    name: "Blockchain Security",
    description: "Utilize blockchain technology to ensure unparalleled data security and HIPAA compliance.",
    icon: Shield,
  },
  {
    name: "Predictive Analytics",
    description:
      "Harness the power of machine learning for advanced predictive analytics, improving patient care and hospital operations.",
    icon: BarChart2,
  },
  {
    name: "Global Collaboration",
    description:
      "Enable seamless, secure collaboration between healthcare providers worldwide for better patient outcomes.",
    icon: Globe,
  },
  {
    name: "Smart Patient Profiles",
    description: "Create comprehensive, AI-enhanced patient profiles for personalized care and treatment plans.",
    icon: ClipboardList,
  },
  {
    name: "Telemedicine Integration",
    description: "Seamlessly integrate with telemedicine platforms for a unified healthcare delivery experience.",
    icon: Users,
  },
]

export default function Features() {
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    if (featuresRef.current) {
      const featureItems = featuresRef.current.querySelectorAll(".feature-item")
      featureItems.forEach((item) => observer.observe(item))
    }

    return () => {
      if (featuresRef.current) {
        const featureItems = featuresRef.current.querySelectorAll(".feature-item")
        featureItems.forEach((item) => observer.unobserve(item))
      }
    }
  }, [])

  return (
    <div className="py-12 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Next-Generation Medical Record Management
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            WaslMed offers a suite of advanced features designed to revolutionize healthcare delivery and patient care.
          </p>
        </div>

        <div className="mt-10" ref={featuresRef}>
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="relative feature-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md gradient-bg text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

