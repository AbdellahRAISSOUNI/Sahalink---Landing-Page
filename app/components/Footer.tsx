import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                WaslMed - Abdellah Raissouni
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-300">Connecting healthcare professionals with patients.</p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Solutions</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Company</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Legal</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-800">
          <p className="text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} WaslMed by Abdellah Raissouni
          </p>
        </div>
      </div>
    </footer>
  )
}
