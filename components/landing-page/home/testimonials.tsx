import Image from "next/image"

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
]

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
        d="M0 24V14.4C0 11.7333 0.4 9.33333 1.2 7.2C2.05556 5.01111 3.17778 3.14667 4.56667 1.6L9.2 4.26667C8.2 5.48889 7.38889 6.88889 6.76667 8.46667C6.2 10.0444 5.91111 11.7333 5.9 13.5333H12V24H0ZM20 24V14.4C20 11.7333 20.4 9.33333 21.2 7.2C22.0556 5.01111 23.1778 3.14667 24.5667 1.6L29.2 4.26667C28.2 5.48889 27.3889 6.88889 26.7667 8.46667C26.2 10.0444 25.9111 11.7333 25.9 13.5333H32V24H20Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Testimonials() {
  return (
    <section className="bg-[#f5f5f5] py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-[#222222] mb-4">
            Hear From Our Members
          </h2>
          <p className="text-[#888888] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Real testimonials from entrepreneurs who have transformed their businesses through our platform.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-sm flex flex-col justify-between min-h-[320px]"
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
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-[#222222] text-base">{testimonial.name}</p>
                  <p className="text-[#888888] text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
