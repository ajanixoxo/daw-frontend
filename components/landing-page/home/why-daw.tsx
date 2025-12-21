import { Wifi, Monitor } from "lucide-react"
import Link from "next/link"

export function WhyDAW() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#ffeff7]">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold italic text-[#f10e7c] mb-4">Why DAW</h2>
          <p className="text-[#000000] text-base md:text-lg max-w-xl mx-auto text-pretty leading-relaxed">
            Empowering Women's Cooperatives with Smart, Scalable Management Tools
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Join DAW Cooperative Card */}
          <div className="bg-[#f10e7c] rounded-2xl p-6 md:p-8 min-h-[280px] md:min-h-[320px] flex flex-col">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-auto">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <div className="mt-auto">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">Join DAW Cooperatvive</h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Experience the Power of Belonging — Join a Community that Grows Together.
              </p>
            </div>
          </div>

          {/* Create My Own Cooperative Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 min-h-[280px] md:min-h-[320px] flex flex-col border-2 border-dashed border-[#d2d2d2]">
            <div className="w-12 h-12 flex items-center justify-center mb-auto">
              <Monitor className="w-8 h-8 text-[#000000]" />
            </div>
            <div className="mt-auto">
              <h3 className="text-xl md:text-2xl font-semibold text-[#000000] mb-3">Create My Own Cooperative</h3>
              <p className="text-[#222222]/70 text-sm md:text-base leading-relaxed">
                Lead with Confidence — Build and Manage Your Cooperative Digitally.
              </p>
            </div>
          </div>

          {/* Become a Seller Card */}
          <Link href="/sellers/kyc" className="bg-white rounded-2xl p-6 md:p-8 min-h-[280px] md:min-h-[320px] flex flex-col border-2 border-dashed border-[#d2d2d2] md:col-span-2 lg:col-span-1 hover:border-[#f10e7c] transition-colors cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center mb-auto">
              <Monitor className="w-8 h-8 text-[#000000]" />
            </div>
            <div className="mt-auto">
              <h3 className="text-xl md:text-2xl font-semibold text-[#000000] mb-3">Become a Seller</h3>
              <p className="text-[#222222]/70 text-sm md:text-base leading-relaxed">
                Turn Your Passion into Profit — Sell Smarter on the DAW Marketplace.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
