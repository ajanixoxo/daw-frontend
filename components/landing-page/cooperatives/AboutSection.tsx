import React from 'react';
import Image from 'next/image';


export default function AboutSection() {
  return (
    <section className="bg-[#FFFFFF] flex items-center justify-center px-4 sm:px-6 lg:px-21">
      <div className="w-full max-w-[1440px] py-16 sm:py-20 lg:py-[60px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[30px] items-start">
          {/* Left Column - Content */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[#222222] text-3xl sm:text-4xl lg:text-[40px] font-medium leading-[120%] tracking-[-2.4px]">
              About DAW Cooperative
            </h2>
            <div className="text-[#565656] text-base sm:text-lg lg:text-xl font-normal leading-[120%] tracking-[-0.4px] space-y-4">
              <p>
                DAW Cooperative understands the unique needs of women and provides specialised financial products and services to meet these needs including loans, investment and financial training.
              </p>
              <p>
                Our cooperative model is built on the principles of mutual support, shared prosperity, and community empowerment. We believe that when women come together, they can achieve extraordinary things.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex items-center justify-center lg:h-[416px]">
            <Image
              src="https://api.builder.io/api/v1/image/assets/TEMP/8eaa82fdc69cca61b64e3f231fbc0e001b4139f9?width=1242"
              alt="DAW Cooperative Member"
              className="w-full h-auto lg:h-full object-cover rounded-lg"
              width={1242}
              height={416}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
