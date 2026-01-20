"use client";

import { use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/landing-page/cooperatives/Footer";
import Image from "next/image";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { courses, Course } from "@/lib/masterclass-data";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function CourseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    notFound();
  }

  const otherCourses = courses.filter((c) => c.id !== course.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Breadcrumb / Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#222222] mb-4">
            Masterclass
          </h1>
          <p className="text-[#6b6b6b] text-base max-w-lg mx-auto">
            Discover authentic handcrafted products made by talented women
            entrepreneurs from across Africa.
          </p>
        </div>

        {/* Hero Section */}
        <div className=" rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 mb-12 ">
          <div className="lg:w-1/2 relative aspect-video rounded-l-2xl overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-white border border-[#E5E5E5] rounded-full text-xs text-[#6b6b6b]">
                {course.category}
              </span>
              <span className="px-3 py-1 bg-white border border-[#E5E5E5] rounded-full text-xs text-[#6b6b6b]">
                {course.level}
              </span>
              <span className="ml-auto px-4 py-1 bg-black text-white rounded-full text-xs font-medium">
                {course.duration}
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-[#222222] mb-4">
              {course.title}
            </h2>
            <p className="text-[#6b6b6b] text-base leading-relaxed mb-8">
              {course.description}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-2xl md:text-3xl font-bold text-[#222222]">
                ₦{course.price.toLocaleString()}
              </span>
              <Link
                href={`/masterclass/${course.id}/buy`}
                className="bg-[#F10E7C] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#D40D6D] transition-colors"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Overview and Outline */}
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-[#222222] mb-6">
                Course Overview
              </h3>
              <p className="text-[#6b6b6b] text-base leading-relaxed">
                {course.overview}
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-[#222222] mb-6">
                Course Outline
              </h3>
              <div className="space-y-4">
                {course.outline.map((module, idx) => (
                  <AccordionItem key={idx} module={module} />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Recommendations */}
          <div className="lg:col-span-1">
            <div className=" rounded-3xl p-8 sticky top-28">
              <h3 className="text-xl font-bold text-[#222222] mb-8">
                You may also like
              </h3>
              <div className="space-y-12">
                {otherCourses.map((other) => (
                  <div key={other.id}>
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1 bg-white border border-[#E5E5E5] rounded-full text-xs text-[#6b6b6b]">
                        {other.category}
                      </span>
                      <span className="px-3 py-1 bg-white border border-[#E5E5E5] rounded-full text-xs text-[#6b6b6b]">
                        {other.level}
                      </span>
                      <span className="ml-auto px-3 py-1 bg-black text-white rounded-full text-xs font-medium">
                        {other.duration}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-[#222222] mb-3">
                      {other.title}
                    </h4>
                    <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4 line-clamp-2">
                      {other.description}
                    </p>
                    <Link
                      href={`/masterclass/${other.id}`}
                      className="text-[#F10E7C] font-semibold text-sm flex items-center gap-2 group"
                    >
                      Watch now
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function AccordionItem({ module }: { module: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#E5E5E5] rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 bg-[#F5F5F5] hover:bg-[#EDEDED] transition-colors ${
          isOpen ? "border-b border-[#E5E5E5]" : ""
        }`}
      >
        <span className="font-semibold text-[#222222]">{module.title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#6b6b6b]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#6b6b6b]" />
        )}
      </button>
      {isOpen && (
        <div className="bg-white">
          {module.items.map((item: any, idx: number) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-4 ${
                idx !== module.items.length - 1
                  ? "border-b border-[#F5F5F5]"
                  : ""
              }`}
            >
              <span className="text-[#222222] text-sm">
                {idx + 1}.{idx + 1} {item.title}
              </span>
              <span className="text-[#6b6b6b] text-sm">{item.duration}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
