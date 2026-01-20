"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";

export default function CommunityPage() {
  const impactStats = [
    {
      number: "8",
      description: "African Countries Impacted",
    },
    {
      number: "12",
      description: "Global Countries Impacted",
    },
    {
      number: "20k",
      description: "Women Empowered",
    },
  ];

  const testimonials = [
    {
      quote:
        "Since joining the cooperative, my sales have increased by 300%. The loan I received helped me purchase better equipment, and the masterclasses taught me how to market my products online.",
      name: "Amina B.",
      role: "Textile Artisan, Lagos",
    },
    {
      quote:
        "The platform connected me with customers from Europe and America. I started with the Basic tier and quickly upgraded to Premium as my business grew. The support from the community has been invaluable.",
      name: "Grace M.",
      role: "Jewelry Designer, Nairobi",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section - Join Our Growing Community */}
      <section className="bg-black flex items-center justify-center px-4 sm:px-6 lg:px-24">
        <motion.div
          variants={staggerContainer(0.2, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="w-full max-w-[1440px] py-16 sm:py-20 lg:py-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Left Column - Intro and Benefits */}
            <div className="flex flex-col gap-10">
              {/* Introduction Text */}
              <motion.p
                variants={fadeIn("up", 0.1)}
                className="text-[#A7A7A7] text-[15px] sm:text-[17px] leading-[1.6] max-w-[500px]"
              >
                Become part of a thriving network of over 20,000 empowered
                African women entrepreneurs. Our cooperative membership offers
                exclusive benefits designed to accelerate your business growth
                and personal development.
              </motion.p>

              {/* Benefits List */}
              <div className="flex flex-col gap-4">
                {[
                  {
                    title: "Priority Loan Access",
                    description:
                      "Fast-track approval for all loan categories with preferential interest rates",
                  },
                  {
                    title: "Investment Opportunities",
                    description:
                      "Access to exclusive investment opportunities and savings programs with competitive returns",
                  },
                  {
                    title: "Free Marketplace Access",
                    description:
                      "Join the DAW Marketplace at no cost and receive up to 10% discount on purchases",
                  },
                  {
                    title: "Exclusive Training Programs",
                    description:
                      "Access to advanced workshops, masterclasses, and one-on-one mentorship sessions",
                  },
                  {
                    title: "A Strong Community",
                    description:
                      "We support women in agriculture, technology, health tech, fashion, energy, and more",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn("right", 0.1 * index + 0.2)}
                    className="p-6 rounded-[16px] bg-[#1A1A1A] border border-white/5 shadow-sm hover:border-white/20 transition-all group"
                  >
                    <h3 className="text-white text-lg font-semibold mb-2 group-hover:text-[#F10E7C] transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-[#A7A7A7] text-[15px] leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - Title and Impact Card */}
            <div className="flex flex-col justify-between h-full lg:min-h-[700px]">
              {/* Heading */}
              <motion.h1
                variants={fadeIn("left", 0.3)}
                className="text-white text-[42px] sm:text-[54px] lg:text-[64px] font-bold leading-[1.1] tracking-tight text-balance"
              >
                What You Benefit <br className="hidden sm:block" />
                from Our Growing <br className="hidden sm:block" />
                Community
              </motion.h1>

              {/* Stats Card - Positioned at bottom left area */}
              <motion.div
                variants={fadeIn("up", 0.5)}
                className="mt-20 lg:mt-auto self-start w-full sm:w-[420px] p-10 lg:p-12 rounded-[24px] bg-[#222222] flex flex-col items-center justify-center gap-2 border border-white/5 shadow-2xl"
              >
                <div className="text-[#F10E7C] text-[48px] lg:text-[64px] font-bold tracking-tighter">
                  20,000+
                </div>
                <div className="text-white text-[24px] lg:text-[32px] font-medium tracking-tight text-center">
                  Active Members
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Our Impact in Numbers Section */}
      <section className="bg-white flex items-center justify-center px-4 sm:px-6 lg:px-24">
        <motion.div
          variants={staggerContainer(0.2, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="w-full max-w-[1440px] py-20 lg:py-32"
        >
          <div className="flex flex-col gap-16 lg:gap-24">
            {/* Header */}
            <div className="flex flex-col gap-6 max-w-2xl text-left">
              <motion.h2
                variants={fadeIn("up", 0.1)}
                className="text-[#1A1A1A] text-4xl sm:text-5xl lg:text-[54px] font-bold leading-[1.1] tracking-tight"
              >
                Our Impact in Numbers
              </motion.h2>
              <motion.p
                variants={fadeIn("up", 0.2)}
                className="text-[#6B6B6B] text-lg sm:text-xl leading-relaxed"
              >
                We measure our success by the growth and resilience of the women
                we serve. Our community spans across borders, creating a ripple
                effect of economic empowerment.
              </motion.p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
              {impactStats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn("up", 0.1 * index + 0.3)}
                  className="flex flex-col gap-2 group"
                >
                  <div className="text-[#1A1A1A] text-7xl lg:text-[100px] font-bold leading-none tracking-tighter group-hover:text-[#F10E7C] transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-[#1A1A1A] text-xl sm:text-2xl font-semibold tracking-tight">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#FFEFF7] flex items-center justify-center px-4 sm:px-6 lg:px-24 border-t border-gray-100">
        <motion.div
          variants={staggerContainer(0.2, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="w-full max-w-[1440px] py-20 lg:py-32"
        >
          <div className="flex flex-col gap-16">
            {/* Header */}
            <div className="flex flex-col gap-4 items-center text-center max-w-3xl mx-auto">
              <motion.h2
                variants={fadeIn("up", 0.1)}
                className="text-[#1A1A1A] text-[36px] sm:text-[44px] font-bold leading-[1.2] tracking-tight"
              >
                Hear From Our Members
              </motion.h2>
              <motion.p
                variants={fadeIn("up", 0.2)}
                className="text-[#6B6B6B] text-lg sm:text-xl leading-relaxed"
              >
                Real stories from entrepreneurs who have transformed their lives
                and businesses through our global cooperative network.
              </motion.p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn("up", 0.1 * index + 0.3)}
                  className="flex flex-col justify-between gap-10 p-8 lg:p-12 rounded-[32px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-6">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="opacity-20 text-[#ce0566]"
                    >
                      <path
                        d="M20.3092 17.708C22.1962 15.66 22.0062 13.03 22.0002 13V5C22.0002 4.73478 21.8948 4.48043 21.7073 4.29289C21.5197 4.10536 21.2654 4 21.0002 4H15.0002C13.8972 4 13.0002 4.897 13.0002 6V13C13.0002 13.2652 13.1055 13.5196 13.2931 13.7071C13.4806 13.8946 13.7349 14 14.0002 14H17.0782C17.0566 14.4943 16.9089 14.9749 16.6492 15.396C16.1412 16.197 15.1842 16.744 13.8032 17.02L13.0002 17.18V20H14.0002C16.7832 20 18.9062 19.229 20.3092 17.708ZM9.30216 17.708C11.1902 15.66 10.9992 13.03 10.9932 13V5C10.9932 4.73478 10.8878 4.48043 10.7003 4.29289C10.5127 4.10536 10.2584 4 9.99316 4H3.99316C2.89016 4 1.99316 4.897 1.99316 6V13C1.99316 13.2652 2.09852 13.5196 2.28606 13.7071C2.47359 13.8946 2.72795 14 2.99316 14H6.07116C6.04959 14.4943 5.90191 14.9749 5.64216 15.396C5.13416 16.197 4.17716 16.744 2.79616 17.02L1.99316 17.18V20H2.99316C5.77616 20 7.89916 19.229 9.30216 17.708Z"
                        fill="currentColor"
                      />
                    </svg>
                    <p className="text-[#1A1A1A] text-xl lg:text-[22px] font-medium leading-[1.4] tracking-tight ">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 shrink-0"></div>
                    <div className="flex flex-col">
                      <div className="text-[#1A1A1A] text-lg font-bold leading-none mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-[#F10E7C] text-sm font-semibold uppercase tracking-wider">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
