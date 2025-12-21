import Image from "next/image"

export function OurVision() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap- items-stretch">
          {/* Left - Image */}
          <div className="lg:w-[45%] flex-shrink-0">
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-full lg:min-h-[550px] rounded-2xl overflow-hidden">
              <Image
                src="/eye.png"
                alt="Close-up of a human eye representing vision and foresight"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="lg:w-[55%] flex flex-col justify-center py-4 p-8 bg-white border rounded-md">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-normal text-[#222222] mb-6">
              Our Vision
            </h2>

            <p className="text-[#6b6b6b] text-lg md:text-xl leading-relaxed mb-10">
              To build a world where African women lead boldly in business and technology, transforming their lives and
              communities through innovation and collaboration.
            </p>

            {/* Feature Cards */}
            <div className="space-y-6">
              {/* Card 1 */}
              <div className="bg-[#f5f5f5] rounded-xl p-6 md:p-8">
                <h3 className="font-semibold text-xl md:text-2xl text-[#222222] mb-2">
                  Building Inclusive Communities:
                </h3>
                <p className="text-[#6b6b6b] text-base md:text-lg leading-relaxed">
                  Creating networks that foster growth, connection, and opportunity.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#f5f5f5] rounded-xl p-6 md:p-8">
                <h3 className="font-semibold text-xl md:text-2xl text-[#222222] mb-2">Empowerment Through Skills:</h3>
                <p className="text-[#6b6b6b] text-base md:text-lg leading-relaxed">
                  Helping women gain the knowledge and tools they need to thrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
