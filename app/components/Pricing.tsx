"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
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
  },
]

export default function Pricing() {
  const pricingRef = useRef<HTMLDivElement>(null)

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

    if (pricingRef.current) {
      const pricingItems = pricingRef.current.querySelectorAll(".pricing-item")
      pricingItems.forEach((item) => observer.observe(item))
    }

    return () => {
      if (pricingRef.current) {
        const pricingItems = pricingRef.current.querySelectorAll(".pricing-item")
        pricingItems.forEach((item) => observer.unobserve(item))
      }
    }
  }, [])

  return (
    <div className="bg-gray-900" id="pricing">
      <div className="pt-12 sm:pt-16 lg:pt-24">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
            <h2 className="text-lg leading-6 font-semibold text-primary uppercase tracking-wider">Pricing</h2>
            <p className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Enterprise-Grade Solutions for Modern Healthcare
            </p>
            <p className="text-xl text-gray-300">
              Choose the plan that best suits your organization's needs. All plans include a 30-day free trial.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 pb-12 bg-gray-50 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
        <div className="relative">
          <div className="absolute inset-0 h-3/4 bg-gray-900"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-3 lg:gap-5 lg:space-y-0"
              ref={pricingRef}
            >
              {tiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden pricing-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                    <div>
                      <h3
                        className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary text-white"
                        id={tier.name}
                      >
                        {tier.name}
                      </h3>
                    </div>
                    <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                      {typeof tier.priceMonthly === "number" ? (
                        <>
                          ${tier.priceMonthly}
                          <span className="ml-1 text-2xl font-medium text-gray-500">/mo</span>
                        </>
                      ) : (
                        <span className="text-4xl">{tier.priceMonthly}</span>
                      )}
                    </div>
                    <p className="mt-5 text-lg text-gray-500">{tier.description}</p>
                  </div>
                  <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
                    <ul className="space-y-4">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <div className="flex-shrink-0">
                            <Check className="h-6 w-6 text-green-500" aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-base text-gray-700">{feature}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-md shadow">
                      <Button asChild className="w-full gradient-bg hover:opacity-90 transition-opacity duration-300">
                        <a href={tier.href}>Get started</a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

