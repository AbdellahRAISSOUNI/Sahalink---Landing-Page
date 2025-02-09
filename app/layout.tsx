import "./globals.css"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "WaslMed - Revolutionizing Medical Records",
  description:
    "WaslMed is a cutting-edge AI and blockchain-powered platform that transforms healthcare data management.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        
        <main className="flex-grow">{children}</main>
  
        <Analytics />
      </body>
    </html>
  )
}

