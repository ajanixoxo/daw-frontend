import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-[#FFFFFF] flex items-center justify-center px-4 sm:px-6 lg:px-20">
      <div className="w-full max-w-[1440px] py-12 sm:py-16 lg:py-20">
        <div className="relative overflow-hidden rounded-[20px] bg-[#F10E7C] px-6 sm:px-12 lg:px-20 py-12 sm:py-16 lg:py-[107px]">
          {/* Content */}
          <div className="relative z-10 flex flex-col gap-8 sm:gap-10 max-w-[500px]">
            <div className="flex flex-col gap-2">
              <h2 className="text-[#FFFFFF] text-3xl sm:text-4xl lg:text-[52px] font-bold leading-[120%] tracking-[-3.12px]">
                Ready to Transform Your Business?
              </h2>
              <p className="text-[#FFFFFF] text-base sm:text-lg lg:text-xl font-normal leading-[140%] tracking-[-0.8px]">
                Join thousands of entrepreneurs who are already growing their businesses on our platform.
              </p>
            </div>

            <Link href="/cooperative/cooperative-signup">
              <button className="flex px-6 sm:px-8 py-4 justify-center items-center gap-1 rounded-[40px] bg-[#FFFFFF] hover:bg-[#f5f5f5] transition-colors self-start">
              <span className="text-[#222222] text-lg sm:text-xl font-medium tracking-[-0.8px]">
                Join Daw Cooperative
              </span>
            </button>
            </Link>

          
          </div>

          {/* Decorative Star Pattern */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] hidden lg:block">
            <svg 
              width="423" 
              height="368" 
              viewBox="0 0 423 368" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <g clipPath="url(#clip0_2160_116021)">
                <path d="M236.904 138.408C231.982 96.2341 226.786 51.7055 226.786 0H273.214C273.214 51.1248 268.042 95.5967 263.128 137.818C259.124 172.225 255.294 205.137 254.583 238.938C277.895 214.621 298.288 188.837 319.65 161.829C345.989 128.529 373.804 93.3681 410.362 56.808L443.192 89.638C407.041 125.789 371.934 153.576 338.605 179.958L338.574 179.981C311.426 201.473 285.456 222.03 261.062 245.417C294.737 244.706 327.389 240.896 361.59 236.905C403.764 231.982 448.295 226.786 500 226.786V273.214C448.878 273.214 404.405 268.04 362.186 263.128L362.155 263.125C327.755 259.122 294.853 255.295 261.062 254.583C285.362 277.878 311.133 298.261 338.124 319.609L338.166 319.645C371.467 345.986 406.63 373.799 443.192 410.362L410.362 443.192C374.211 407.042 346.425 371.938 320.047 338.611L319.985 338.525L319.932 338.456C298.469 311.351 277.936 285.423 254.583 261.062C255.294 294.862 259.124 327.775 263.128 362.182C268.042 404.404 273.214 448.875 273.214 500H226.786C226.786 448.295 231.982 403.766 236.904 361.592L236.914 361.524C240.9 327.346 244.706 294.715 245.417 261.062C222.064 285.423 201.531 311.351 180.068 338.456L180.015 338.525L179.952 338.611C153.575 371.938 125.789 407.042 89.638 443.192L56.808 410.362C93.3699 373.799 128.533 345.986 161.834 319.645L161.876 319.609C188.868 298.261 214.637 277.878 238.938 254.583C205.137 255.296 172.224 259.125 137.814 263.128C95.595 268.04 51.123 273.214 0 273.214V226.786C51.7055 226.786 96.2367 231.982 138.41 236.905C172.611 240.896 205.262 244.706 238.938 245.417C214.534 222.021 188.554 201.458 161.395 179.958C128.066 153.576 92.9583 125.789 56.808 89.638L89.638 56.808C126.196 93.3681 154.011 128.529 180.35 161.829C201.713 188.836 222.105 214.62 245.417 238.935C244.706 205.284 240.9 172.654 236.914 138.476L236.904 138.408Z" fill="#F76EB0"/>
              </g>
              <defs>
                <clipPath id="clip0_2160_116021">
                  <rect width="500" height="500" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
