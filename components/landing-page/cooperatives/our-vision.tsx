import Image from "next/image";

export function OurVision() {
  return (
    <section className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto">
        {/* Unified Card Container */}
        <div className="bg-white rounded-[20px]  flex flex-col lg:flex-row items-stretch overflow-hidden ">
          {/* Left - Image Side (Flush) */}
          <div className="w-full lg:w-[46%] relative min-h-[280px] md:min-h-[360px] lg:min-h-full flex-shrink-0">
            <Image
              src="/eye.png"
              alt="Close-up of a human eye representing vision and foresight"
              fill
              className="object-cover rounded-[20px]"
              priority
            />
          </div>

          {/* Right - Content Side */}
          <div className="w-full lg:w-[54%] flex flex-col justify-center p-8 md:p-10 lg:p-12">
            <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-semibold text-[#1A1A1A] mb-6 tracking-[-0.03em] leading-tight">
              Our Vision
            </h2>

            <p className="text-[#6b6b6b] text-[16px] md:text-[18px] leading-relaxed mb-10 max-w-[540px]">
              To build a world where African women lead boldly in business and
              technology, transforming their lives and communities through
              innovation and collaboration.
            </p>

            {/* Feature Boxes */}
            <div className="space-y-4">
              {/* Box 1 */}
              <div className="bg-[#F9F9F9] rounded-[24px] p-6 md:p-8 border border-gray-100/50">
                <h3 className="font-bold text-[18px] md:text-[20px] text-[#1A1A1A] mb-2 tracking-tight">
                  Building Inclusive Communities:
                </h3>
                <p className="text-[#6b6b6b] text-[15px] md:text-[16px] leading-relaxed">
                  Creating networks that foster growth, connection, and
                  opportunity.
                </p>
              </div>

              {/* Box 2 */}
              <div className="bg-[#F9F9F9] rounded-[24px] p-6 md:p-8 border border-gray-100/50">
                <h3 className="font-bold text-[18px] md:text-[20px] text-[#1A1A1A] mb-2 tracking-tight">
                  Empowerment Through Skills:
                </h3>
                <p className="text-[#6b6b6b] text-[15px] md:text-[16px] leading-relaxed">
                  Helping women gain the knowledge and tools they need to
                  thrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
