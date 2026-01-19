"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Search, ArrowRight } from "lucide-react";

const courses = [
  {
    id: 1,
    image: "/cargo.png",
    category: "Marketing",
    level: "Beginner",
    duration: "45 minutes",
    title: "Digital Marketing Essentials",
    description:
      "Learn how to leverage social media and digital platforms to reach global customers and grow your online presence.",
  },
  {
    id: 2,
    image: "/laptop.png",
    category: "Finance",
    level: "Beginner",
    duration: "80 minutes",
    title: "Financial Management for Small Business",
    description:
      "Master the basics of business finance, from record-keeping to profit margins and sustainable growth planning.",
  },
  {
    id: 3,
    image: "/plan.png",
    category: "Logistics",
    level: "Intermediate",
    duration: "50 minutes",
    title: "International Shipping Made Simple",
    description:
      "Navigate international shipping regulations, customs procedures, and cost-effective global delivery strategies.",
  },
];

const categories = [
  "All Categories",
  "Marketing",
  "Finance",
  "Logistics",
  "Business",
];

export function MasterclassContent() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 my-8">
          <h1 className=" text-3xl md:text-4xl font-bold text-[#222222] mb-4">
            Masterclass
          </h1>
          <p className="text-[#6b6b6b] text-base max-w-lg mx-auto leading-relaxed">
            Discover products made by talented women entrepreneurs from across
            Africa.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-5 py-3 bg-white border border-[#e5e5e5] rounded-full text-sm text-[#222222] hover:border-[#d2d2d2] transition-colors min-w-[160px]"
            >
              <span>{selectedCategory}</span>
              <ChevronDown
                className={`w-4 h-4 text-[#6b6b6b] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-[#e5e5e5] rounded-xl shadow-lg z-10 min-w-[160px] py-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[#f5f5f5] transition-colors ${
                      selectedCategory === category
                        ? "text-[#f10e7c] font-medium"
                        : "text-[#222222]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
            <input
              type="text"
              placeholder="Search Masterclass..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[320px] lg:w-[400px] pl-11 pr-4 py-3 bg-[#f5f5f5] border-0 rounded-full text-sm text-[#222222] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#f10e7c]/20"
            />
          </div>
        </div>

        {/* Course List */}
        <div className="space-y-0">
          {filteredCourses.map((course, index) => (
            <div
              key={course.id}
              className={`flex flex-col md:flex-row gap-6 md:gap-8 py-8 ${
                index !== filteredCourses.length - 1
                  ? "border-b border-[#e5e5e5]"
                  : ""
              }`}
            >
              {/* Course Image */}
              <div className="relative w-full md:w-[380px] h-[220px] md:h-[230px] flex-shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Course Details */}
              <div className="flex-1 flex flex-col justify-between py-1">
                {/* Top Row: Tags and Duration */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white border border-[#e5e5e5] rounded-full text-xs text-[#222222]">
                      {course.category}
                    </span>
                    <span className="px-3 py-1 bg-white border border-[#e5e5e5] rounded-full text-xs text-[#222222]">
                      {course.level}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-[#222222] text-white rounded-full text-xs font-medium">
                    {course.duration}
                  </span>
                </div>

                {/* Title */}
                <h2 className=" text-xl md:text-2xl font-bold text-[#222222] mb-2 leading-tight">
                  {course.title}
                </h2>

                {/* Description */}
                <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4">
                  {course.description}
                </p>

                {/* Watch Now Link */}
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-[#f10e7c] text-sm font-medium group hover:gap-3 transition-all"
                >
                  Watch now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#6b6b6b]">
              No courses found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
