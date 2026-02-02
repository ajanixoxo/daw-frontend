import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BecomeASellerBanner() {
  return (
    <section className="max-w-[1440px] mx-auto px-5 lg:px-[84px] py-8 lg:py-16">
      <div className="relative mb-8 w-full overflow-hidden rounded-[32px] md:mb-12">
        {/* Background Image */}
        <div className="absolute inset-0 h-[400px] w-full md:h-[500px]">
          <Image
            src="/banner-seller.jpg"
            alt="Become a Seller"
            fill
            className="object-cover object-top"
          />
          {/* Overlay - adjusting gradient to match contrast of the design usually seen with this banner */}
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-transparent via-black/40 to-black/80" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex h-[400px] w-full items-center justify-end px-6 py-12 md:h-[500px] md:px-16 md:py-16">
          <div className="max-w-[600px] text-left md:text-left">
            <h2 className="mb-6 font-inter text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[64px]">
              Become a Seller
            </h2>
            <p className="mb-8 max-w-[500px] font-inter text-lg font-normal leading-[1.5] text-white/90 md:text-xl">
              Join our community of trusted sellers and start reaching millions
              of customers. Ready to grow your business and make your products
              available to a vast audience?
            </p>
            <Link
              href="/seller/register" // Assuming this route, can adjust later
              className="inline-flex items-center gap-2 rounded-full bg-[#f10e7c] px-8 py-4 text-center font-medium text-white transition-colors hover:bg-[#d10c6c]"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
