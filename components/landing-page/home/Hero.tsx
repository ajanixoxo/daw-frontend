"use client";

import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";

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
          "absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out",
          currentSlide === 0
            ? "opacity-100 z-10 pointer-events-auto"
            : "opacity-0 z-0 pointer-events-none",
        )}
      >
        <div className="relative mx-auto h-full max-w-[1440px]">
          <div className="relative flex h-full flex-col items-center px-5 lg:flex-row lg:px-[84px]">
            {/* Left Content */}
            <motion.div
              variants={staggerContainer(0.2, 0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="relative z-20 flex flex-col items-start gap-8 pt-20 lg:max-w-[650px] lg:gap-10 lg:pt-0"
            >
              <div className="flex flex-col items-start gap-4">
                <motion.h1
                  variants={fadeIn("up", 0.2)}
                  className="font-inter text-[32px] font-medium leading-[120%] tracking-[-0.06em] text-[#222] sm:text-[40px] lg:text-[52px] lg:tracking-[-3.12px]"
                >
                  Empowering African Women Through Digital Commerce
                </motion.h1>
                <motion.p
                  variants={fadeIn("up", 0.4)}
                  className="max-w-[480px] font-inter text-[16px] font-normal leading-[150%] tracking-[-0.02em] text-[#6B6B6B] lg:text-[18px]"
                >
                  Join our cooperative and transform your business with digital
                  tools, financial support, and a global marketplace.
                </motion.p>
              </div>

              <motion.div
                variants={fadeIn("up", 0.6)}
                className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-5"
              >
                <Link href="/cooperative/cooperative-signup">
                  <button className="flex h-[56px] min-w-[180px] items-center justify-center rounded-[40px] bg-[#F10E7C] px-8 transition-all hover:bg-[#d00c6b] hover:shadow-lg">
                    <span className="font-inter text-[16px] font-semibold text-white">
                      Join Daw Cooperative
                    </span>
                  </button>
                </Link>
                <Link href="/sellers/sellers-signup">
                  <button className="flex h-[56px] min-w-[180px] items-center justify-center rounded-[40px] border border-[#F10E7C]/20 bg-white px-8 transition-all hover:bg-[#FFF5FB] hover:border-[#F10E7C]/40">
                    <span className="font-inter text-[16px] font-semibold text-[#F10E7C]">
                      Become a Seller
                    </span>
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Image Container */}
            <div className="absolute bottom-0 right-0 h-full w-full lg:w-[65%]">
              {/* Soft Gradient Background */}
              <div className="absolute right-0 top-1/2 h-[80%] w-[80%] -translate-y-1/2 rounded-full bg-linear-to-l from-[#FDEAF3] via-[#FDEAF3]/40 to-transparent blur-[120px]" />

              <motion.div
                variants={fadeIn("left", 0.5)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative flex h-full w-full items-end justify-end overflow-hidden lg:overflow-visible"
              >
                <Image
                  src="/dawoman.png"
                  alt="Empowered African Businesswoman"
                  className="h-[60%] w-auto object-contain sm:h-[75%] lg:h-[110%] lg:translate-y-[10%]"
                  width={1200}
                  height={1500}
                  priority={currentSlide === 0}
                />

                {/* Isomorphic Bottom Blur/Fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-white via-white/60 to-transparent backdrop-blur-sm"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to top, black 20%, transparent 100%)",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SLIDE 2: Dark Slider Background Design --- */}
      <div
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out",
          currentSlide === 1
            ? "opacity-100 z-10 pointer-events-auto"
            : "opacity-0 z-0 pointer-events-none",
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
          <motion.div
            variants={staggerContainer(0.2, 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-[900px]"
          >
            <motion.h1
              variants={fadeIn("up", 0.2)}
              className="mb-6 font-inter text-[32px] font-medium leading-[120%] tracking-[-0.06em] text-white transition-all duration-700 sm:text-[48px] lg:text-[64px] lg:tracking-[-3.12px]"
            >
              Empowering African Women Through Digital Commerce
            </motion.h1>
            <motion.p
              variants={fadeIn("up", 0.4)}
              className="mx-auto mb-10 max-w-[600px] font-inter text-[16px] font-normal leading-[140%] tracking-[-0.72px] text-white/90 lg:text-[20px]"
            >
              Join our cooperative and transform your business with digital
              tools, financial support, and a global marketplace.
            </motion.p>

            <motion.div
              variants={fadeIn("up", 0.6)}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
            >
              <Link href="/cooperative/cooperative-signup">
                <button className="flex min-w-[200px] items-center justify-center rounded-[40px] bg-[#F10E7C] px-8 py-4 transition-colors hover:bg-[#d00c6b]">
                  <span className="font-inter text-[18px] font-medium tracking-[-0.8px] text-white lg:text-[20px]">
                    Join DAW Cooperative
                  </span>
                </button>
              </Link>
              <Link href="/marketplace">
                <button className=" flex min-w-[200px] items-center justify-center rounded-[40px] border border-white bg-transparent px-8 py-4 transition-colors hover:bg-white/10">
                  <span className="font-inter text-[18px] font-medium tracking-[-0.8px] text-white lg:text-[20px]">
                    Enter Marketplace
                  </span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
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
                  : "bg-white/50 hover:bg-white",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
