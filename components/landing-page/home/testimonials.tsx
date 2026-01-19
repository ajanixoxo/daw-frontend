"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "Since joining the cooperative, my sales have increased by 300%. The loan I received helped me purchase better equipment, and the masterclasses taught me how to market my products online.",
    name: "Amina B.",
    role: "Textile Artisan, Lagos",
    avatar: "/amina.png",
  },
  {
    quote:
      "The platform connected me with customers from Europe and America. I started with the Basic tier and quickly upgraded to Premium as my business grew. The support from the community has been invaluable.",
    name: "Grace M.",
    role: "Jewelry Designer, Nairobi",
    avatar: "/grace.png",
  },
  {
    quote:
      "I was struggling to manage my inventory and accounting before joining. The dashboard tools simplified everything, allowing me to focus on creating. This community is a game-changer.",
    name: "Chidinma O.",
    role: "Fashion Entrepreneur, Abuja",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
  },
  {
    quote:
      "The networking opportunities have opened doors I didn't know existed. Collaborating with other women in the cooperative helped me launch a new product line that sold out in weeks.",
    name: "Sarah K.",
    role: "Organic Skincare, Accra",
    avatar:
      "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=400&h=400&fit=crop",
  },
];

function QuoteIcon() {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#f10e7c]"
    >
      <path
        d="M0 24V14.4C0 11.7333 0.4 9.33333 1.2 7.2C2.05556 5.01111 3.17778 3.14667 4.56667 1.6L9.2 4.26667C8.2 5.48889 7.38889 6.88889 6.76667 8.46667C6.2 10.0444 5.91111 11.7333 5.9 13.5333H12V24H0ZM20 24V14.4C20 11.7333 20.4 9.33333 21.2 7.2C22.0556 5.01111 23.1778 3.14667 24.5667 1.6L9.2 4.26667C28.2 5.48889 27.3889 6.88889 26.7667 8.46667C26.2 10.0444 25.9111 11.7333 25.9 13.5333H32V24H20Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  // Update items per slide based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="bg-[#f5f5f5] py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className=" text-3xl md:text-4xl lg:text-[42px] font-bold text-[#222222] mb-4">
            Hear From Our Members
          </h2>
          <p className="text-[#888888] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Real testimonials from entrepreneurs who have transformed their
            businesses through our platform.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full flex gap-6 px-1">
                  {testimonials
                    .slice(
                      slideIndex * itemsPerSlide,
                      (slideIndex + 1) * itemsPerSlide,
                    )
                    .map((testimonial, index) => (
                      <div
                        key={index}
                        className={cn(
                          "bg-white rounded-2xl p-8 md:p-10 shadow-sm flex flex-col justify-between min-h-[320px] transition-all duration-300 hover:shadow-md",
                          itemsPerSlide === 1 ? "w-full" : "w-1/2",
                        )}
                      >
                        {/* Quote Icon */}
                        <div>
                          <QuoteIcon />
                          {/* Quote Text */}
                          <p className="text-[#222222] text-lg md:text-xl lg:text-[22px] font-semibold leading-relaxed mt-6">
                            {testimonial.quote}
                          </p>
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-4 mt-8">
                          <div className="relative h-14 w-14 rounded-full overflow-hidden bg-gray-200 shrink-0">
                            <Image
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-[#222222] text-base">
                              {testimonial.name}
                            </p>
                            <p className="text-[#888888] text-sm">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#222222] hover:bg-[#F10E7C] hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#222222] hover:bg-[#F10E7C] hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  currentSlide === index
                    ? "w-8 bg-[#F10E7C]"
                    : "w-2.5 bg-gray-300 hover:bg-[#F10E7C]/50",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
