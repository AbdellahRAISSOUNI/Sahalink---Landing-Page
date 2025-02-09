import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block group">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 bg-300% animate-gradient">
                WaslMed - Abdellah Raissouni
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
              Connecting healthcare professionals with patients through innovative solutions.
            </p>
            <div className="flex space-x-5 mt-6">
              <Link href="#" className="text-gray-400 hover:text-blue-400 transform hover:scale-110 transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-sky-400 transform hover:scale-110 transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-pink-400 transform hover:scale-110 transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-500 transform hover:scale-110 transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <span className="hover:underline">Analytics</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <span className="hover:underline">Insights</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <span className="hover:underline">About</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <span className="hover:underline">Blog</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <span className="hover:underline">Privacy</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <span className="hover:underline">Terms</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800/50">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} WaslMed by Abdellah Raissouni. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
