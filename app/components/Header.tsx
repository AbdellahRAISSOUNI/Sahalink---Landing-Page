"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from 'next/image';
import { motion } from 'framer-motion';

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? "backdrop-filter backdrop-blur-xl bg-white/30 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-1/4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <div
                
            
                className="relative"
              >
                <span className="sr-only">WaslMed</span>
                <Image src="/logo.png" alt="WaslMed Logo" width={100} height={100} className="transition-transform hover:scale-105 duration-300" />
              </div>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Button variant="ghost" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span className="sr-only">Open menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
          <nav className="hidden md:flex space-x-10">
            {["features", "testimonials", "pricing"].map((item) => (
              <Link 
                key={item}
                href={`#${item}`} 
                className="relative text-base font-medium text-gray-500 transition-colors duration-300 hover:text-gray-900 group"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Button 
              asChild 
              variant="ghost" 
              className="relative ml-8 whitespace-nowrap overflow-hidden group"
            >
              <Link href="/demo" className="relative z-10 px-6 py-2">
                <span className="relative z-10">Schedule Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="ghost" 
              className="relative ml-8 whitespace-nowrap overflow-hidden group"
            >
              <Link href="#cta" className="relative z-10 px-6 py-2">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-50">
            <div className="pt-5 pb-6 px-5 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Image src="/logo.png" alt="WaslMed Logo" width={80} height={80} />
                </div>
                <div className="-mr-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-md p-2 inline-flex items-center justify-center hover:bg-gray-100 focus:outline-none"
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid grid-cols-1 gap-4">
                  {["features", "testimonials", "pricing"].map((item) => (
                    <Link
                      key={item}
                      href={`#${item}`}
                      className="px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="mt-6 space-y-4">
                <Button 
                  asChild 
                  variant="ghost"
                  className="w-full justify-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/demo">Schedule Demo</Link>
                </Button>
                <Button 
                  asChild 
                  className="w-full justify-center bg-primary hover:bg-primary/90"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="#cta">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}