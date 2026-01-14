import Header from "@/components/Header";
import Image from "next/image";

import Link from "next/link";
export default function Hero() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden bg-white flex items-center justify-center pt-20 md:pt-0">
        {/* Background Gradients */}
        <div className="absolute top-[174px] right-[129px] w-[719px] h-[636px] opacity-40 blur-[250px] bg-gradient-to-br from-[#F10E7C]/90 to-[#FCCD35]/90 pointer-events-none" />
        <div className="absolute top-[174px] left-[-118px] w-[719px] h-[636px] opacity-40 blur-[250px] bg-gradient-to-br from-[#F10E7C]/90 to-[#FCCD35]/90 pointer-events-none" />

        <div className="absolute top-[174px] right-[129px] w-[719px] h-[636px] opacity-40 blur-[250px] bg-gradient-to-br from-[#F10E7C]/90 to-[#FCCD35]/90 pointer-events-none" />
        <div className="absolute top-[174px] left-[-118px] w-[719px] h-[636px] opacity-40 blur-[250px] bg-gradient-to-br from-[#F10E7C]/90 to-[#FCCD35]/90 pointer-events-none" />

        {/* Background Images */}
        <Image
          src="https://api.builder.io/api/v1/image/assets/TEMP/980427758a00106b3dd5aa1e1d1aafa8c0760281?width=3768"
          alt=""
          className="absolute top-[-49px] left-[-224px] w-[1884px] h-[899px] object-cover mix-blend-screen  "
          fill
        />
        {/* <Image
          src="https://api.builder.io/api/v1/image/assets/TEMP/7eed225ae0cc0d6c80515301883979ce8ca8fed9?width=3768"
          alt=""
          fill
          className="absolute top-[-49px] left-[-224px] w-[1884px] h-[899px] object-cover mix-blend-lighten  "
        /> */}

        {/* Bottom Blur */}
        <div className="absolute bottom-[230px] left-[-101px] w-full max-w-[1642px] h-[307px]  pointer-events-none hidden md:block" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center gap-8 md:gap-10 px-6 md:px-0 max-w-[633px] w-full py-12 md:py-0">
          {/* Text Content */}
          <div className="flex flex-col items-center gap-4 w-full">
            <h1 className="text-[#222] text-center text-[32px] md:text-[52px] font-medium leading-[120%] tracking-[-0.06em] md:tracking-[-3.12px]">
              Empowering African Woman Through Digital Commerce
            </h1>
            <p className="text-[#6B6B6B] text-center text-[16px] md:text-[18px] font-normal leading-[140%] tracking-[-0.02em] md:tracking-[-0.72px] max-w-[516px]">
              Join our cooperative and transform your business with digital
              tools, financial support, and a global marketplace.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-5 w-full md:w-auto">
            <Link href="/cooperatives/join">
              <button className="w-full md:w-auto flex items-center justify-center px-8 py-4 rounded-[40px] cursor-pointer bg-[#222] text-white text-[18px] md:text-[20px] font-medium tracking-[-0.8px]">
                Join DAW Cooperative
              </button>
            </Link>
            <Link href="/masterclass">
              <button className="w-full md:w-auto flex items-center justify-center px-8 py-4 rounded-[40px] border border-[#FCCFE5] bg-white text-[#F10E7C] text-[18px] md:text-[20px] font-medium tracking-[-0.8px]">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
