"use client"

import { usePathname } from 'next/navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isDoctorPage = pathname.includes('/demo/doctor')
  const isPatientPage = pathname.includes('/demo/patient')

  // Don't show header and footer for doctor and patient pages
  if (isDoctorPage || isPatientPage) {
    return <div className="min-h-screen">{children}</div>
  }

  // Show header and footer for other demo pages
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
