"use client";

import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[800px] w-full overflow-hidden bg-white">
      {/* Header - Adapts theme based on current slide */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header theme={currentSlide === 0 ? "dark" : "light"} />
      </div>

      {/* --- SLIDE 1: Original White Design --- */}
      <div
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out pt-20",
          currentSlide === 0
            ? "opacity-100 z-10 pointer-events-auto"
            : "opacity-0 z-0 pointer-events-none"
        )}
      >
        <div className="relative mx-auto max-w-[1440px]">
          <div className="relative flex min-h-[760px] flex-col items-center justify-between px-5 py-12 lg:flex-row lg:px-[84px] lg:py-0">
            {/* Left Content */}
            <div className="relative z-10 mb-8 flex max-w-full flex-col items-start gap-8 lg:mb-0 lg:max-w-[633px] lg:gap-10">
              <div className="flex flex-col items-start gap-4">
                <h1 className="font-inter text-[32px] font-medium leading-[120%] tracking-[-0.06em] text-[#222] sm:text-[40px] lg:text-[52px] lg:tracking-[-3.12px]">
                  Empowering African Women Through Digital Commerce
                </h1>
                <p className="max-w-[516px] font-inter text-[16px] font-normal leading-[140%] tracking-[-0.72px] text-[#6B6B6B] lg:text-[18px]">
                  Join our cooperative and transform your business with digital
                  tools, financial support, and a global marketplace.
                </p>
              </div>

              <div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-5">
                <Link href="/cooperatives/join">
                  <button className="flex w-full items-center justify-center rounded-[40px] bg-[#F10E7C] px-8 py-4 transition-colors hover:bg-[#d00c6b] sm:w-auto">
                    <span className="font-inter text-[18px] font-medium tracking-[-0.8px] text-white lg:text-[20px]">
                      Join DAW Cooperative
                    </span>
                  </button>
                </Link>
                <Link href="/marketplace">
                  <button className="flex w-full items-center justify-center rounded-[40px] border border-[#FCCFE5] bg-white px-8 py-4 transition-colors hover:bg-[#FFF5FB] sm:w-auto">
                    <span className="font-inter text-[18px] font-medium tracking-[-0.8px] text-[#F10E7C] lg:text-[20px]">
                      Enter Marketplace
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Image with Gradient */}
            <div className="relative flex w-full items-center justify-center lg:w-auto lg:justify-end">
              {/* Gradient Blur Effect - Hidden on mobile */}
              <div className="pointer-events-none absolute right-[-100px] top-[100px] hidden h-[636px] w-[719px] bg-gradient-to-br from-[rgba(241,14,124,0.4)] via-[rgba(246,110,174,0.4)] to-[rgba(252,205,53,0.4)] blur-[250px] lg:block"></div>

              {/* Woman Image */}
              <div className="relative z-10 w-full max-w-[500px] lg:max-w-[900px]">
                <Image
                  src="https://api.builder.io/api/v1/image/assets/TEMP/c79d4e14d02fbec6f417674dd3c0303e429826e7?width=1560"
                  alt="Happy young African American businesswoman"
                  className="h-auto w-full object-cover"
                  width={1560}
                  height={899}
                  priority={currentSlide === 0}
                />
                {/* BLUR END EFFECT */}
                <div className="absolute bottom-0 left-0 right-[-100px] h-[35%] bg-gradient-to-t from-white via-white/80 to-transparent backdrop-blur-[4px]"></div>
              </div>
            </div>
          </div>
          {/* Bottom Blur Effect */}
          <div className="pointer-events-none absolute bottom-0 left-[-101px] hidden h-[307px] w-[1642px] bg-[rgba(255,255,255,0.1)] blur-[30px] backdrop-blur-[50px] lg:block"></div>
        </div>
      </div>

      {/* --- SLIDE 2: Dark Slider Background Design --- */}
      <div
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out",
          currentSlide === 1
            ? "opacity-100 z-10 pointer-events-auto"
            : "opacity-0 z-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0">
          <Image
            src="/sliderBg.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority={currentSlide === 1}
          />
          {/* Custom Overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(49, 6, 27, 0.62)" }}
          ></div>
        </div>

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-20 text-center lg:px-[84px]">
          <div className="max-w-[900px]">
            <h1 className="mb-6 font-inter text-[32px] font-medium leading-[120%] tracking-[-0.06em] text-white transition-all duration-700 sm:text-[48px] lg:text-[64px] lg:tracking-[-3.12px]">
              Empowering African Woman Through Digital Commerce
            </h1>
            <p className="mx-auto mb-10 max-w-[600px] font-inter text-[16px] font-normal leading-[140%] tracking-[-0.72px] text-white/90 lg:text-[20px]">
              Join our cooperative and transform your business with digital
              tools, financial support, and a global marketplace.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Link href="/cooperatives/join">
                <button className="flex min-w-[200px] items-center justify-center rounded-[40px] bg-[#F10E7C] px-8 py-4 transition-colors hover:bg-[#d00c6b]">
                  <span className="font-inter text-[18px] font-medium tracking-[-0.8px] text-white lg:text-[20px]">
                    Join DAW Cooperative
                  </span>
                </button>
              </Link>
              <Link href="/marketplace">
                <button className="flex min-w-[200px] items-center justify-center rounded-[40px] border border-white bg-transparent px-8 py-4 transition-colors hover:bg-white/10">
                  <span className="font-inter text-[18px] font-medium tracking-[-0.8px] text-white lg:text-[20px]">
                    Enter Marketplace
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTROLS --- */}
      {/* Dots Indicator */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-3 rounded-full transition-all duration-300",
              index === currentSlide ? "w-8" : "w-3",
              // Alternate colors based on current background
              currentSlide === 0
                ? index === currentSlide
                  ? "bg-[#F10E7C]"
                  : "bg-gray-300 hover:bg-gray-400"
                : index === currentSlide
                ? "bg-[#F10E7C]"
                : "bg-white/50 hover:bg-white"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
