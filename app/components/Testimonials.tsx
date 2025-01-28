"use client"

import { useEffect, useRef } from "react"

export default function Testimonials() {
  const testimonialRef = useRef<HTMLQuoteElement>(null)

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

    if (testimonialRef.current) {
      observer.observe(testimonialRef.current)
    }

    return () => {
      if (testimonialRef.current) {
        observer.unobserve(testimonialRef.current)
      }
    }
  }, [])

  return (
    <section className="py-12 bg-gray-50 overflow-hidden md:py-20 lg:py-24" id="testimonials">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <blockquote className="mt-10" ref={testimonialRef}>
            <div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
              <p>
                &ldquo;Sahalink has revolutionized our patient record management. We've seen a 30% increase in
                efficiency and a significant improvement in patient care since implementing their platform. It's
                intuitive, secure, and exactly what we needed to modernize our healthcare delivery.&rdquo;
              </p>
            </div>
            <footer className="mt-8">
              <div className="md:flex md:items-center md:justify-center">
                <div className="md:flex-shrink-0">
                  <img className="mx-auto h-10 w-10 rounded-full" src="/dr-lee.png" alt="Dr. Lee" />
                </div>
                <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                  <div className="text-base font-medium text-gray-900">Dr. Emily Chen</div>
                  <svg className="hidden md:block mx-1 h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 0h3L9 20H6l5-20z" />
                  </svg>
                  <div className="text-base font-medium text-gray-500">Chief of Medicine, Metro Hospital</div>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
