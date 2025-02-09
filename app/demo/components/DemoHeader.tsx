import Link from "next/link"
import Image from 'next/image'

export default function DemoHeader() {
  return (
    <header className="fixed w-full z-50 bg-white/30 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-start items-center py-2">
          <Link href="/" className="flex items-center">
            <span className="sr-only">WaslMed</span>
            <Image src="/logo.png" alt="WaslMed Logo" width={80} height={80} className="w-auto h-8" />
          </Link>
        </div>
      </div>
    </header>
  )
}
