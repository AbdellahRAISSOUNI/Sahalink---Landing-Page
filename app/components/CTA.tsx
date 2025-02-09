"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function CTA() {
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    if (ctaRef.current) {
      observer.observe(ctaRef.current)
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current)
      }
    }
  }, [])

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500" id="cta">
      <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8" ref={ctaRef}>
        <motion.h2
          className="text-3xl font-extrabold text-white sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block">Revolutionize your healthcare practice.</span>
          <span className="block">Experience WaslMed today.</span>
        </motion.h2>
        <motion.p
          className="mt-4 text-lg leading-6 text-indigo-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Join the future of medical record management with AI-powered insights, blockchain security, and seamless
          global collaboration.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            asChild
            size="lg"
            className="mt-8 w-full sm:w-auto glass-effect hover:bg-white hover:text-primary transition-colors duration-300"
          >
            <a href="/demo" className="text-primary-foreground hover:text-primary">
              Schedule a Demo
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

