"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { courses } from "@/lib/masterclass-data";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";

export function LearnGrowCourses() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <motion.div
        variants={staggerContainer(0.2, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="max-w-[1440px] mx-auto px-5 lg:px-[84px]"
      >
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.h2
            variants={fadeIn("right", 0.1)}
            className=" text-3xl md:text-4xl lg:text-5xl font-bold text-[#222222] mb-4"
          >
            Learn & Grow Your Business
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.2)}
            className="text-[#6b6b6b] text-base md:text-lg max-w-xl leading-relaxed"
          >
            Access expert-led courses tailored to help entrepreneurs
            <br className="hidden md:block" /> succeed in the global
            marketplace.
          </motion.p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={fadeIn("up", 0.3)}
              className="flex flex-col group cursor-pointer"
            >
              {/* Course Image with Duration Badge */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-[#222222]/80 text-white text-sm px-3 py-1 rounded-md">
                  {course.duration}
                </div>
              </div>

              {/* Course Info */}
              <div className="flex flex-col flex-1">
                {/* Tags */}
                <div className="flex gap-2 mb-3">
                  <span className="text-sm text-[#6b6b6b] bg-[#f5f5f5] px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="text-sm text-[#6b6b6b] bg-[#f5f5f5] px-3 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-[#222222] text-xl mb-3 leading-tight group-hover:text-[#F10E7C] transition-colors">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-[#6b6b6b] text-base leading-relaxed mb-4 flex-1">
                  {course.description}
                </p>

                {/* Explore Masterclass Link */}
                <a
                  href={`/masterclass/${course.id}`}
                  className="text-[#f10e7c] font-semibold text-base hover:underline inline-flex items-center gap-2 group/link"
                >
                  Explore Masterclass
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
