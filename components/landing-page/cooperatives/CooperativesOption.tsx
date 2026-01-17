import React from 'react';
import Image from 'next/image';
import Link from 'next/link';



export default function CooperativesOption() {
  const cooperatives = [
    {
      id: 1,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/259bcb3bbd7d9c4442c1d6e65a66f62082673945?width=818",
      verified: true,
      tags: ["Fashion", "Textiles", "Accessories"],
      title: "Lagos Fashion Collective",
      description: "Empowering women through sustainable fashion and traditional textiles",
      members: 45,
      location: "Lagos, Nigeria"
    },
    {
      id: 2,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/4fdf8c55a11884ac6b602297ba3995f9688a619b?width=818",
      verified: true,
      tags: ["Fashion", "Textiles", "Accessories"],
      title: "Lagos Fashion Collective",
      description: "Empowering women through sustainable fashion and traditional textiles",
      members: 45,
      location: "Lagos, Nigeria"
    },
    {
      id: 3,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/4fdf8c55a11884ac6b602297ba3995f9688a619b?width=818",
      verified: true,
      tags: ["Fashion", "Textiles", "Accessories"],
      title: "Lagos Fashion Collective",
      description: "Empowering women through sustainable fashion and traditional textiles",
      members: 45,
      location: "Lagos, Nigeria"
    }
  ];

  return (
    <section className="bg-[#FFFFFF] flex items-center justify-center px-4 sm:px-6 lg:px-24">
      <div className="w-full max-w-[1440px] py-12 sm:py-14 lg:py-[58px]">
        <div className="flex flex-col gap-12 sm:gap-14 lg:gap-[60px]">
          {/* Header */}
          <div className="flex flex-col gap-4 items-center text-center">
            <h2 className="text-[#222222] text-3xl sm:text-4xl lg:text-[40px] font-medium leading-[120%] tracking-[-2.4px]">
              Join Other Cooperative
            </h2>
            <p className="text-[#6B6B6B] text-sm sm:text-base font-normal leading-[140%] tracking-[-0.64px] max-w-[516px]">
              Access expert-led courses tailored to help entrepreneurs succeed in the global marketplace.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-start gap-4 sm:gap-6">
            {/* Category Dropdown */}
            <button className="flex h-[60px] px-6 sm:px-8 justify-center items-center gap-4 rounded-[40px] border border-[#E5E5E5] bg-[#FFFFFF]">
              <span className="text-[#222222] text-base font-medium tracking-[-0.64px]">
                All Categories
              </span>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M4.16699 7.66667L10.0003 13.5L15.8337 7.66667" 
                  stroke="black" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Search Bar */}
            <div className="flex flex-1 sm:max-w-[624px] h-[60px] px-5 items-center gap-1 rounded-[40px] border border-[#E5E5E5] bg-[#F5F5F5]">
              <input
                type="text"
                placeholder="Search cooperatives..."
                className="flex-1 bg-transparent text-base font-medium tracking-[-0.64px] placeholder:text-[rgba(0,0,0,0.25)] outline-none"
              />
            </div>
          </div>

          {/* Cooperatives Grid */}
          <div className="flex flex-col gap-12 sm:gap-14 lg:gap-[60px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[30px]">
              {cooperatives.map((coop) => (
                <div 
                  key={coop.id} 
                  className="flex flex-col gap-5 rounded-[20px]"
                >
                  {/* Image */}
                  <div className="relative w-full h-[300px]">
                    <Image
                      src={coop.image}
                      alt={coop.title}
                      className="w-full h-full object-cover rounded-[20px]"
                      fill
                    />
                    {coop.verified && (
                      <div className="absolute top-[18px] right-[18px] inline-flex px-3 py-1 items-start rounded-[12px] bg-[#E3FDE7]">
                        <span className="text-[#2BA570] text-sm font-bold">
                          Verified
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-4">
                    {/* Tags */}
                    <div className="flex items-start gap-[10px] flex-wrap">
                      {coop.tags.map((tag, index) => (
                        <div 
                          key={index}
                          className="inline-flex px-3 py-1 items-start rounded-[12px] bg-[#FDE3F1]"
                        >
                          <span className="text-[#F10E7C] text-xs font-bold">
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Title and Description */}
                    <div className="flex flex-col gap-1">
                      <h3 className="text-[#222222] text-base font-bold leading-[120%] tracking-[-0.96px]">
                        {coop.title}
                      </h3>
                      <p className="text-[#6B6B6B] text-sm font-normal leading-[140%] tracking-[-0.84px]">
                        {coop.description}
                      </p>
                    </div>

                    {/* Members and Location */}
                    <div className="flex items-start gap-4 justify-between">
                      <div className="flex items-center gap-1">
                        <svg 
                          width="20" 
                          height="20" 
                          viewBox="0 0 20 20" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            d="M10.1331 9.05817C10.0498 9.04984 9.9498 9.04984 9.85814 9.05817C7.8748 8.9915 6.2998 7.3665 6.2998 5.3665C6.2998 3.32484 7.9498 1.6665 9.9998 1.6665C12.0415 1.6665 13.6998 3.32484 13.6998 5.3665C13.6915 7.3665 12.1165 8.9915 10.1331 9.05817Z" 
                            stroke="#292D32" 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                          <path 
                            d="M5.9666 12.1335C3.94993 13.4835 3.94993 15.6835 5.9666 17.0252C8.25827 18.5585 12.0166 18.5585 14.3083 17.0252C16.3249 15.6752 16.3249 13.4752 14.3083 12.1335C12.0249 10.6085 8.2666 10.6085 5.9666 12.1335Z" 
                            stroke="#292D32" 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[#222222] text-xs font-light leading-[120%] tracking-[-0.72px]">
                          {coop.members} Members
                        </span>
                      </div>
                      <span className="text-[#6B6B6B] text-sm font-normal leading-[140%] tracking-[-0.84px]">
                        {coop.location}
                      </span>
                    </div>

                    {/* Join Button */}

                    <Link href="/cooperative/cooperative-signup">

                           <button className="flex w-full px-5 py-3 justify-center items-center gap-1 rounded-[40px] bg-[#222222] hover:bg-[#000000] transition-colors">
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M10.8337 18.3332H4.16699C2.50033 18.3332 1.66699 17.4998 1.66699 15.8332V9.1665C1.66699 7.49984 2.50033 6.6665 4.16699 6.6665H8.33366V15.8332C8.33366 17.4998 9.16699 18.3332 10.8337 18.3332Z" 
                          stroke="white" 
                          strokeWidth="1.5" 
                          strokeMiterlimit="10" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                        <path 
                          d="M8.42531 3.3335C8.35865 3.5835 8.33366 3.8585 8.33366 4.16683V6.66683H4.16699V5.00016C4.16699 4.0835 4.91699 3.3335 5.83366 3.3335H8.42531Z" 
                          stroke="white" 
                          strokeWidth="1.5" 
                          strokeMiterlimit="10" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                        <path 
                          d="M11.667 6.6665V10.8332" 
                          stroke="white" 
                          strokeWidth="1.5" 
                          strokeMiterlimit="10" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                        <path 
                          d="M15 6.6665V10.8332" 
                          stroke="white" 
                          strokeWidth="1.5" 
                          strokeMiterlimit="10" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                        <path 
                          d="M14.167 14.1665H12.5003C12.042 14.1665 11.667 14.5415 11.667 14.9998V18.3332H15.0003V14.9998C15.0003 14.5415 14.6253 14.1665 14.167 14.1665Z" 
                          stroke="white" 
                          strokeWidth="1.5" 
                          strokeMiterlimit="10" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                        <path 
                          d="M5 10.8335V14.1668" 
                          stroke="white" 
                          strokeWidth="1.5" 
                          strokeMiterlimit="10" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                        <path 
                          d="M8.33301 15.8332V4.1665C8.33301 2.49984 9.16634 1.6665 10.833 1.6665H15.833C17.4997 1.6665 18.333 2.49984 18.333 4.1665V15.8332C18.333 17.4998 17.4997 18.3332 15.833 18.3332H10.833C9.16634 18.3332 8.33301 17.4998 8.33301 15.8332Z" 
                          stroke="white" 
                          strokeWidth="1.5" 
                          strokeMiterlimit="10" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-[#FFFFFF] text-base font-medium tracking-[-0.64px]">
                        Join Cooperative
                      </span>
                    </button>
                    
                    </Link>
             

                    
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            <div className="flex justify-center">
              <button className="flex px-6 sm:px-8 py-4 justify-center items-center gap-1 rounded-[40px] bg-[#F10E7C] hover:bg-[#d00c69] transition-colors">
                <span className="text-[#FFFFFF] text-lg sm:text-xl font-medium tracking-[-0.8px]">
                  View more
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
