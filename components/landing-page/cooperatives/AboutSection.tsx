"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";

export default function AboutSection() {
  return (
    <section className="bg-[#FFFFFF] flex items-center justify-center px-4 sm:px-6 lg:px-21 overflow-hidden">
      <motion.div
        variants={staggerContainer(0.2, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="w-full max-w-[1440px] py-16 sm:py-20 lg:py-[60px]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[30px] items-start">
          {/* Left Column - Content */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            className="flex flex-col gap-4"
          >
            <h2 className="text-[#222222] text-3xl sm:text-4xl lg:text-[40px] font-medium leading-[120%] tracking-[-2.4px]">
              About DAW Cooperative
            </h2>
            <div className="text-[#565656] text-base sm:text-lg lg:text-xl font-normal leading-[120%] tracking-[-0.4px] space-y-4">
              <p>
                DAW Cooperative understands the unique needs of women and
                provides specialised financial products and services to meet
                these needs including loans, investment and financial training.
              </p>
              <p>
                Our cooperative model is built on the principles of mutual
                support, shared prosperity, and community empowerment. We
                believe that when women come together, they can achieve
                extraordinary things.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            variants={fadeIn("left", 0.3)}
            className="flex items-center justify-center lg:h-[416px]"
          >
            <Image
              src="/apron.jpg"
              alt="DAW Cooperative Member"
              className="w-full h-auto lg:h-full object-cover rounded-lg shadow-xl"
              width={1242}
              height={416}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
