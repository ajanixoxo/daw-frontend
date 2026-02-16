"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";

export function OurSDGs() {
  const sdgs = [
    {
      number: 1,
      title: "NO POVERTY",
      icon: (
        <Image
          src="/people.svg"
          alt="No Poverty Icon"
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
        />
      ),
    },
    {
      number: 4,
      title: "QUALITY EDUCATION",
      icon: (
        <Image
          src="/book.svg"
          alt="Quality Education Icon"
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
        />
      ),
    },
    {
      number: 5,
      title: "GENDER EQUALITY",
      icon: (
        <Image
          src="/equal.svg"
          alt="Gender Equality Icon"
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
        />
      ),
    },
    {
      number: 8,
      title: "DECENT WORK AND ECONOMIC GROWTH",
      icon: (
        <Image
          src="/chart.svg"
          alt="Economic Growth Icon"
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
        />
      ),
    },
    {
      number: 9,
      title: "INDUSTRY, INNOVATION AND INFRASTRUCTURE",
      icon: (
        <Image
          src="/box.svg"
          alt="Industry Icon"
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
        />
      ),
    },
    {
      number: 10,
      title: "REDUCED INEQUALITIES",
      icon: (
        <Image
          src="/reduced.svg"
          alt="Reduced Inequalities Icon"
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
        />
      ),
    },
  ];

  return (
    <section className="bg-[#fff5f9] py-12 md:py-16 overflow-hidden">
      <motion.div
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto max-w-[1440px] px-5 lg:px-[84px]"
      >
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.h2
            variants={fadeIn("up", 0.1)}
            className=" text-4xl md:text-5xl font-medium text-[#f10e7c] mb-4"
          >
            OUR SDGs
          </motion.h2>
          <motion.p
            variants={fadeIn("up", 0.2)}
            className="text-[#666666] text-base md:text-lg"
          >
            Our mission aligns with the following UN Sustainable Development
            Goals:
          </motion.p>
        </div>

        {/* SDG Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {sdgs.map((sdg) => (
            <motion.div
              key={sdg.number}
              variants={fadeIn("up", 0.3)}
              className="bg-[#fce8f0] rounded-2xl p-6 md:p-8 flex flex-col hover:shadow-lg transition-all hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="mb-8 md:mb-12">{sdg.icon}</div>

              {/* Number and Title */}
              <div className="mt-auto">
                <span className="block text-5xl md:text-6xl font-light text-[#222222] mb-2">
                  {sdg.number}
                </span>
                <h3 className="text-sm md:text-base font-medium text-[#222222] tracking-wide leading-tight">
                  {sdg.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
