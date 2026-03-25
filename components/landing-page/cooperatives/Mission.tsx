"use client";

import React from "react";
import Image from "next/image";
import { OurVision } from "./our-vision";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";

export default function Mission() {
  return (
    <div className="min-h-screen bg-[#FFEFF7] py-12 overflow-hidden">
      <motion.div
        variants={staggerContainer(0.2, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="w-full max-w-[1440px] mx-auto px-5 lg:px-[84px]"
      >
        <div className="flex flex-col items-center gap-16 lg:gap-[60px]">
          {/* Header Section */}
          <motion.div
            variants={fadeIn("up", 0.1)}
            className="flex flex-col items-center gap-4 text-center max-w-full"
          >
            <h1 className="text-[#222222] text-[32px] sm:text-[40px] lg:text-[48px] font-medium tracking-tight mb-2">
              Our Mission
            </h1>
            <div className="flex flex-col gap-6 max-w-[900px] items-center">
              <p className="text-[#222222] text-lg lg:text-[20px] font-light leading-relaxed tracking-tight max-w-[800px]">
                The Digital African Women (DAW) cooperatives empowers African
                women entrepreneurs by providing the access, resources, and
                support needed to scale their businesses efficiently.
              </p>
              <p className="text-[#222222] text-lg lg:text-[20px] font-light leading-relaxed tracking-tight max-w-[850px]">
                DAW empowers African women entrepreneurs with access to finance,
                markets, and skills to scale their businesses. We create
                pathways for women to lead, innovate, and transform their
                communities through entrepreneurship.
              </p>
            </div>
          </motion.div>

          {/* Cards Section */}
          <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-8">
            {/* Financial Support Card - Left Column */}
            <motion.div
              variants={fadeIn("right", 0.2)}
              className="w-full lg:w-[780px] flex flex-col rounded-[24px] overflow-hidden bg-white hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="p-8 lg:p-[30px_48px] flex flex-col gap-1">
                <h2 className="text-[#222222] text-xl lg:text-[32px] font-medium tracking-tight">
                  To Support
                </h2>
                <p className="text-[#222222] text-base lg:text-[20px] font-normal tracking-tight">
                  To women with resources and financial access
                </p>
              </div>
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/a78e8a45e8a35604ee09e25f9dba0f8ed4e126f3?width=1588"
                alt="Pink piggy bank with coins"
                className="w-full h-auto object-cover"
                width={1588}
                height={530}
              />
            </motion.div>

            {/* Right Column - Two Cards */}
            <div className="w-full lg:w-[460px] flex flex-col gap-6 lg:gap-8">
              {/* Community Power Card */}
              <motion.div
                variants={fadeIn("left", 0.3)}
                className="relative rounded-[24px] overflow-hidden h-[300px] lg:h-[268px] flex flex-col hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <Image
                  src="https://api.builder.io/api/v1/image/assets/TEMP/025ba80d7c9175ace8c3eb648a796fd78f237238?width=908"
                  alt="Pink flowers background"
                  className="absolute inset-0 w-full h-full object-cover"
                  fill
                />
                <div
                  className="absolute top-0 left-0 right-0 h-[140px] "
                  style={{
                    background:
                      // "linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0))",
                      "linear-gradient(180deg, #FFFFFF 100%, rgba(255, 255, 255, 0.9) 100%, rgba(255, 255, 255, 0.00) 100%)",
                    filter: "blur(40px)",
                  }}
                ></div>
                <div className="relative z-10 p-8 lg:p-[32px_40px] flex flex-col gap-1">
                  <h2 className="text-[#222222] text-xl lg:text-[28px] font-medium tracking-tight">
                    To Empower
                  </h2>
                  <p className="text-[#222222] text-base lg:text-[18px] font-normal tracking-tight max-w-[280px]">
                    To women to achieve economic independence
                  </p>
                </div>
              </motion.div>

              {/* Training & Education Card */}
              <motion.div
                variants={fadeIn("left", 0.4)}
                className="relative rounded-[24px] overflow-hidden h-[300px] lg:h-[268px] flex flex-col hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <Image
                  src="https://api.builder.io/api/v1/image/assets/TEMP/afe355cbc2c6c76538c2333ed23be8f551830226?width=1122"
                  alt="Laptop on desk"
                  className="absolute inset-0 w-full h-full object-cover"
                  fill
                />
                <div
                  className="absolute top-0 left-0 right-0 h-[140px] "
                  style={{
                    background:
                      // "linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))",
                      "linear-gradient(180deg, #222222 20.91%, rgba(34, 34, 34, 1) 42.11%, rgba(34, 34, 34, 1) 65%)",
                    filter: "blur(40px)",
                  }}
                ></div>
                <div className="relative z-10 p-8 lg:p-[32px_40px] flex flex-col gap-1">
                  <h2 className="text-white text-xl lg:text-[28px] font-medium tracking-tight">
                    To Engage
                  </h2>
                  <p className="text-white/90 text-base lg:text-[18px] font-normal tracking-tight max-w-[320px]">
                    To women through digital literacy and business training
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <OurVision />
      </motion.div>
    </div>
  );
}
