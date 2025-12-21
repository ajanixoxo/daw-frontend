import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Header from "@/components/Header"

const categories = [
  {
    name: "Handcrafted\nGoods",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 28C12 28 12 36 12 38C12 40 14 42 16 42H32"
          stroke="#222222"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M12 28C8 28 6 26 6 22C6 18 10 16 14 16" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 16C14 12 18 8 24 8C30 8 34 12 34 16" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M34 16C38 16 42 18 42 22C42 26 38 28 34 28" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M34 28H14" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="18" r="2" stroke="#222222" strokeWidth="1.5" />
        <circle cx="28" cy="18" r="2" stroke="#222222" strokeWidth="1.5" />
        <path d="M24 22V26" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Agricultural\nProducts",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 42V26" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 26L24 18" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 22L24 26L30 22" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 14L24 18L28 14" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 8L24 10L26 8" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 42H32" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Fashion\n& Beauty",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 18C16 18 16 12 24 12C32 12 32 18 32 18" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M14 20H34C35.1046 20 36 20.8954 36 22V36C36 37.1046 35.1046 38 34 38H14C12.8954 38 12 37.1046 12 36V22C12 20.8954 12.8954 20 14 20Z"
          stroke="#222222"
          strokeWidth="1.5"
        />
        <ellipse cx="24" cy="26" rx="4" ry="2" stroke="#222222" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Digital\nServices",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="10" width="32" height="22" rx="2" stroke="#222222" strokeWidth="1.5" />
        <path d="M18 38H30" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 32V38" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 36H32" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Health &\nWellness",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24 40C24 40 8 30 8 20C8 14 12 10 18 10C21 10 24 12 24 12C24 12 27 10 30 10C36 10 40 14 40 20C40 30 24 40 24 40Z"
          stroke="#222222"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 24H20L22 20L26 28L28 24H32"
          stroke="#222222"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Education\n& Training",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 12V36C8 36 14 34 24 34C34 34 40 36 40 36V12C40 12 34 10 24 10C14 10 8 12 8 12Z"
          stroke="#222222"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M24 10V34" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 16H20" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 22H18" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M28 16H36" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 22H36" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export function HeroSection() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-8 lg:py-32">
           <Header />
      <div className="relative mt-12 md:mt-4 rounded-3xl overflow-hidden min-h-[400px] md:min-h-[480px] lg:min-h-[520px]">
       
        <Image
          src="/herobg.jpg"
          alt="Diverse group of women entrepreneurs"
          fill
          className="object-cover object-right"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#e8e8e8]/95 via-[#e8e8e8]/80 via-40% to-transparent" />

       
        <div className="relative z-10 h-full min-h-[400px] md:min-h-[480px] lg:min-h-[520px] flex flex-col justify-center p-8 md:p-12 lg:p-16 max-w-[500px]">
       
          <div className="flex items-center gap-3 mb-8">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="5" fill="#e91e8c" />
              <g fill="#e91e8c">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <ellipse key={i} cx="24" cy="11" rx="3.5" ry="6" transform={`rotate(${angle} 24 24)`} />
                ))}
              </g>
            </svg>
            <div className="leading-tight">
              <span className="text-[#e91e8c] font-medium text-sm">Digital</span>
              <br />
              <span className="text-[#e91e8c] font-medium text-sm">African</span>
              <br />
              <span className="text-[#e91e8c] font-medium text-sm">Woman</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] font-bold text-[#222222] leading-[1.1] mb-8">
            Transform your
            <br />
            Business Today
          </h1>

          {/* CTA Button */}
          <Link
            href="#"
            className="inline-flex items-center gap-2 bg-[#f10e7c] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#d10c6c] transition-colors w-fit"
          >
            Join DAW Cooperative
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="mt-12 md:mt-16">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#222222] mb-8">Popular Categories</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              href="#"
              className="bg-[#f5f5f5] rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-[#ebebeb] transition-colors min-h-[160px]"
            >
              <div className="w-12 h-12 flex items-center justify-center">{category.icon}</div>
              <span className="text-[#222222] text-sm font-medium text-center whitespace-pre-line leading-tight">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
