import Header from "@/components/Header";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-white pt-20">
        <div className="relative max-w-[1440px] mx-auto">
          {/* Container for the hero content */}
          <div className="relative flex flex-col lg:flex-row items-center justify-between px-5 lg:px-[84px] py-12 lg:py-0 lg:min-h-[760px]">
            
            {/* Left Content */}
            <div className="relative z-10 flex flex-col items-start gap-8 lg:gap-10 max-w-full lg:max-w-[633px] mb-8 lg:mb-0">
              {/* Text Content */}
              <div className="flex flex-col items-start gap-4">
                <h1 className="text-[#222] font-inter text-[32px] sm:text-[40px] lg:text-[52px] font-medium leading-[120%] tracking-[-0.06em] lg:tracking-[-3.12px]">
                  Empowering African Women Through Digital Commerce
                </h1>
                <p className="text-[#6B6B6B] font-inter text-[16px] lg:text-[18px] font-normal leading-[140%] tracking-[-0.72px] max-w-[516px]">
                  Join our cooperative and transform your business with digital tools, financial support, and a global marketplace.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 w-full sm:w-auto">
                <button className="flex items-center justify-center px-8 py-4 rounded-[40px] bg-[#F10E7C] hover:bg-[#d00c6b] transition-colors">
                  <span className="text-white font-inter text-[18px] lg:text-[20px] font-medium tracking-[-0.8px]">
                    Join Cooperative
                  </span>
                </button>
                <button className="flex items-center justify-center px-8 py-4 rounded-[40px] border border-[#FCCFE5] bg-white hover:bg-[#FFF5FB] transition-colors">
                  <span className="text-[#F10E7C] font-inter text-[18px] lg:text-[20px] font-medium tracking-[-0.8px]">
                    Enter Marketplace
                  </span>
                </button>
              </div>
            </div>

            {/* Right Image with Gradient */}
            <div className="relative w-full lg:w-auto flex items-center justify-center lg:justify-end">
              {/* Gradient Blur Effect - Hidden on mobile */}
              <div className="hidden lg:block absolute right-[-100px] top-[100px] w-[719px] h-[636px] bg-linear-to-br from-[rgba(241,14,124,0.4)] via-[rgba(246,110,174,0.4)] to-[rgba(252,205,53,0.4)] blur-[250px] pointer-events-none"></div>
              
              {/* Woman Image */}
            <div className="relative z-10 w-full max-w-[500px] lg:max-w-[900px]">
                <Image
                    src="https://api.builder.io/api/v1/image/assets/TEMP/c79d4e14d02fbec6f417674dd3c0303e429826e7?width=1560"
                    alt="Happy young African American businesswoman"
                    className="w-full h-auto object-cover"
                    width={2560}
                    height={899}
                />
     
                    {/* Bottom glass morphism blend */}
                    <div className="absolute bottom-0 left-0 right-[-100px] h-[15%] bg-gradient-to-t from-white/30 via-white/10 to-transparent backdrop-blur-[20px]"></div>

            </div>
            </div>
          </div>

          {/* Bottom Blur Bar - Desktop only */}
          <div className="hidden lg:block absolute bottom-0 left-[-101px] w-[1642px] h-[307px] bg-[rgba(255,255,255,0.1)] blur-[30px] backdrop-blur-[50px] pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
}
