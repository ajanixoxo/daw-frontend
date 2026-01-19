import Image from "next/image";

export function CooperativePlatform() {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className=" text-3xl md:text-4xl lg:text-5xl font-bold text-[#000000] mb-4 text-balance">
            Our Cooperative Platform
          </h2>
          <p className="text-[#222222]/70 text-base md:text-lg max-w-2xl mx-auto text-pretty leading-relaxed">
            We provide the tools, resources, and community support to help
            entrepreneurs thrive in the digital economy.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="relative rounded-2xl min-h-[420px] md:min-h-[480px] flex flex-col overflow-hidden border border-[#eaeaea]/50">
            {/* Gradient background that fades to white */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f10e7c] via-[#ffff]/60 via-40% to-white" />

            <div className="relative z-10 p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                Digital Storefronts
              </h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-[280px]">
                Create your own branded online store and showcase your products
                to customers worldwide.
              </p>
            </div>

            {/* Illustration positioned at bottom center */}
            <div className="relative z-10 mt-auto flex justify-center items-end px-4 pb-4">
              <Image
                src="/shop.png"
                alt="Digital storefront illustration"
                width={300}
                height={220}
                className="object-contain "
              />
            </div>
          </div>

          <div className="relative rounded-2xl min-h-[420px] md:min-h-[480px] overflow-hidden">
            {/* Background image fills entire card */}
            <Image
              src="/finsup.png"
              alt="Business professionals collaborating"
              fill
              className="object-cover object-top"
            />

            {/* Gradient overlay at top for text readability - fades from gray/white to transparent */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f5]/95 via-[#f5f5f5]/70 via-35% to-transparent" />

            {/* Text content at top */}
            <div className="relative z-10 p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-[#000000] mb-3">
                Financial Support
              </h3>
              <p className="text-[#222222]/80 text-sm md:text-base leading-relaxed max-w-[320px]">
                Access micro-loans based on your membership tier to grow your
                business with flexible repayment terms.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl min-h-[420px] md:min-h-[480px] flex flex-col overflow-hidden md:col-span-2 lg:col-span-1 bg-[#f5e6f5] border border-[#e8d8e8]/50">
            {/* Text content at top left */}
            <div className="relative z-10 p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-[#000000] mb-3">
                Business Education
              </h3>
              <p className="text-[#222222]/70 text-sm md:text-base leading-relaxed max-w-[320px]">
                Learn essential business skills through our masterclass center
                with expert-led courses and workshops.
              </p>
            </div>

            {/* Large dollar sign positioned at bottom right, extending outside padding */}
            <div className="relative z-10 mt-auto flex justify-center items-end">
              <Image
                src="/dolls.png"
                alt="Business education dollar sign"
                width={280}
                height={280}
                className="object-contain translate-x-4 translate-y-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
