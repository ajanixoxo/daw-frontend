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
            <h1
              className="text-[#222222] text-3xl sm:text-4xl lg:text-[40px] font-normal leading-[120%] tracking-[-0.06em]"
              style={{
                fontFamily:
                  "Satoshi, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Our Mission
            </h1>
            <p
              className="text-[#6B6B6B] text-base sm:text-lg lg:text-[20px] font-normal leading-[140%] tracking-[-0.04em] max-w-[600px]"
              style={{
                fontFamily:
                  "Satoshi, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              Our mission is clear: empower entrepreneurs through strategic
              financial support, community building, and collaborative growth
              opportunities.
            </p>
          </motion.div>

          {/* Cards Section */}
          <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-12">
            {/* Financial Support Card - Left Column */}
            <motion.div
              variants={fadeIn("right", 0.2)}
              className="w-full lg:w-[60%] flex flex-col rounded-[20px] overflow-hidden bg-white hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="p-6 sm:p-8 lg:p-[35px_26px] flex flex-col gap-2">
                <h2
                  className="text-[#222222] text-xl sm:text-2xl lg:text-[24px] font-bold leading-[120%] tracking-[-0.04em]"
                  style={{
                    fontFamily:
                      "Satoshi, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Financial Support
                </h2>
                <p
                  className="text-[#222222] text-base sm:text-lg lg:text-[18px] font-normal leading-[120%] tracking-[-0.04em]"
                  style={{
                    fontFamily:
                      "Satoshi, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Specialized financial products including loans, investments,
                  and grants with 0-5% interest rates.
                </p>
              </div>
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/a78e8a45e8a35604ee09e25f9dba0f8ed4e126f3?width=1588"
                alt="Pink piggy bank with coins"
                className="w-full h-auto object-cover rounded-b-[20px]"
                width={1588}
                height={530}
              />
            </motion.div>

            {/* Right Column - Two Cards */}
            <div className="w-full lg:w-[36%] flex flex-col gap-6 lg:gap-6">
              {/* Community Power Card */}
              <motion.div
                variants={fadeIn("left", 0.3)}
                className="relative rounded-[20px] overflow-hidden h-[300px] sm:h-[350px] lg:h-[249px] hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <Image
                  src="https://api.builder.io/api/v1/image/assets/TEMP/025ba80d7c9175ace8c3eb648a796fd78f237238?width=908"
                  alt="Pink flowers background"
                  className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
                  fill
                />
                <div
                  className="absolute top-0 left-0 right-0 h-[200px] backdrop-blur-[50px]"
                  style={{
                    background: "rgba(255, 255, 255, 0.39)",
                    filter: "blur(30px)",
                  }}
                ></div>
                <div className="relative z-10 p-6 sm:p-8 lg:p-[32px_35px] flex flex-col gap-2">
                  <h2
                    className="text-[#222222] text-xl sm:text-2xl lg:text-[24px] font-bold leading-[120%] tracking-[-0.04em]"
                    style={{
                      fontFamily:
                        "Satoshi, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    Community Power
                  </h2>
                  <p
                    className="text-[#222222] text-base sm:text-lg lg:text-[18px] font-normal leading-[120%] tracking-[-0.04em] max-w-[368px]"
                    style={{
                      fontFamily:
                        "Satoshi, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    Join a thriving network of over 20,000 empowered
                    entrepreneurs.
                  </p>
                </div>
              </motion.div>

              {/* Training & Education Card */}
              <motion.div
                variants={fadeIn("left", 0.4)}
                className="relative rounded-[20px] overflow-hidden border border-[#FCCFE5] h-[300px] sm:h-[350px] lg:h-[249px] hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <Image
                  src="https://api.builder.io/api/v1/image/assets/TEMP/afe355cbc2c6c76538c2333ed23be8f551830226?width=1122"
                  alt="Laptop on desk"
                  className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
                  fill
                />
                <div
                  className="absolute top-0 left-0 right-0 h-full rounded-[20px]"
                  style={{
                    background:
                      "linear-gradient(180deg, #222 20.91%, rgba(50, 28, 39, 0.50) 42.11%, rgba(255, 255, 255, 0.00) 58%)",
                    filter: "blur(40px)",
                  }}
                ></div>
                <div className="relative z-10 p-6 sm:p-8 lg:p-[32px_37px] flex flex-col gap-2">
                  <h2
                    className="text-[#FFFFFF] text-xl sm:text-2xl lg:text-[24px] font-bold leading-[120%] tracking-[-0.04em]"
                    style={{
                      fontFamily:
                        "Satoshi, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    Training & Education
                  </h2>
                  <p
                    className="text-[#FFFFFF] text-base sm:text-lg lg:text-[18px] font-normal leading-[120%] tracking-[-0.04em] max-w-[389px]"
                    style={{
                      fontFamily:
                        "Satoshi, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    Access to advanced workshops, masterclasses, and
                    personalized mentorship to grow your skills.
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
