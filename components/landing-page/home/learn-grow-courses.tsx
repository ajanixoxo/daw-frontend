import Image from "next/image"
import { ArrowRight } from "lucide-react"

const courses = [
  {
    id: 1,
    image: "/laptop.png",
    duration: "45 minutes",
    tags: ["Marketing", "Beginner"],
    title: "Digital Marketing Essentials",
    description:
      "Learn how to leverage social media and digital platforms to reach global customers and grow your online presence.",
  },
  {
    id: 2,
    image: "/plan.png",
    duration: "60 minutes",
    tags: ["Finance", "Beginner"],
    title: "Financial Management for Small Business",
    description:
      "Master the basics of business finance, from record-keeping to profit margins and sustainable growth planning.",
  },
  {
    id: 3,
    image: "/cargo.png",
    duration: "50 minutes",
    tags: ["Logistics", "Intermediate"],
    title: "International Shipping Made Simple",
    description:
      "Navigate international shipping regulations, customs procedures, and cost-effective global delivery strategies.",
  },
]

export function LearnGrowCourses() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#222222] mb-4">
            Learn & Grow Your Business
          </h2>
          <p className="text-[#6b6b6b] text-base md:text-lg max-w-xl leading-relaxed">
            Access expert-led courses tailored to help African women entrepreneurs
            <br className="hidden md:block" /> succeed in the global marketplace.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course) => (
            <div key={course.id} className="flex flex-col">
              {/* Course Image with Duration Badge */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-[#222222]/80 text-white text-sm px-3 py-1 rounded-md">
                  {course.duration}
                </div>
              </div>

              {/* Course Info */}
              <div className="flex flex-col flex-1">
                {/* Tags */}
                <div className="flex gap-2 mb-3">
                  {course.tags.map((tag) => (
                    <span key={tag} className="text-sm text-[#6b6b6b] bg-[#f5f5f5] px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-[#222222] text-xl mb-3 leading-tight">{course.title}</h3>

                {/* Description */}
                <p className="text-[#6b6b6b] text-base leading-relaxed mb-4 flex-1">{course.description}</p>

                {/* Explore Masterclass Link */}
                <a
                  href="#"
                  className="text-[#f10e7c] font-semibold text-base hover:underline inline-flex items-center gap-2 group"
                >
                  Explore Masterclass
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
