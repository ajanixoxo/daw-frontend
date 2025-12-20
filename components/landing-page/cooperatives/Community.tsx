// export default function CommunityPage() {
//   return (
//     <div className="min-h-screen bg-[#000000] text-[#ffffff] px-4 py-12 md:py-16 lg:py-20">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
//           {/* Left Column - Benefits */}
//           <div className="space-y-6 lg:space-y-8">
//             {/* Intro Text */}
//             <p className="text-[#a7a7a7] text-base md:text-lg leading-relaxed max-w-2xl">
//               Become part of a thriving network of over 20,000 empowered African women entrepreneurs. Our cooperative
//               membership offers exclusive benefits designed to accelerate your business growth and personal development.
//             </p>

//             {/* Benefits Cards */}
//             <div className="space-y-4 md:space-y-5">
//               {/* Exclusive Training Programs */}
//               <div className="bg-[#101010] rounded-2xl p-6 md:p-8 border border-[#222222]">
//                 <h3 className="text-[#ffffff] text-xl md:text-2xl font-medium mb-3">Exclusive Training Programs</h3>
//                 <p className="text-[#a7a7a7] text-base md:text-lg leading-relaxed">
//                   Access to advanced workshops, masterclasses, and one-on-one mentorship sessions
//                 </p>
//               </div>

//               {/* Investment Opportunities */}
//               <div className="bg-[#101010] rounded-2xl p-6 md:p-8 border border-[#222222]">
//                 <h3 className="text-[#ffffff] text-xl md:text-2xl font-medium mb-3">Investment Opportunities</h3>
//                 <p className="text-[#a7a7a7] text-base md:text-lg leading-relaxed">
//                   Access to exclusive investment opportunities and savings programs with competitive returns
//                 </p>
//               </div>

//               {/* Priority Loan Access */}
//               <div className="bg-[#101010] rounded-2xl p-6 md:p-8 border border-[#222222]">
//                 <h3 className="text-[#ffffff] text-xl md:text-2xl font-medium mb-3">Priority Loan Access</h3>
//                 <p className="text-[#a7a7a7] text-base md:text-lg leading-relaxed">
//                   Fast-track approval for all loan categories with preferential interest rates
//                 </p>
//               </div>

//               {/* Free Marketplace Access */}
//               <div className="bg-[#101010] rounded-2xl p-6 md:p-8 border border-[#222222]">
//                 <h3 className="text-[#ffffff] text-xl md:text-2xl font-medium mb-3">Free Marketplace Access</h3>
//                 <p className="text-[#a7a7a7] text-base md:text-lg leading-relaxed">
//                   Join the DAW Marketplace at no cost and receive up to 10% discount on purchases
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Heading and Stats */}
//           <div className="flex flex-col justify-start lg:justify-center space-y-8 lg:space-y-12">
//             {/* Main Heading */}
//             <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight text-pretty">
//               Join Our Growing Community
//             </h1>

//             {/* Stats Card */}
//             <div className="bg-[#222222] rounded-3xl pt-8 p-8 md:p-10 lg:p-12 text-center border border-[#252525] max-w-md lg:max-w-none">
//               <div className="text-[#f10e7c] text-5xl md:text-6xl lg:text-7xl font-normal mb-4">20,000+</div>
//               <div className="text-[#ffffff] text-2xl md:text-3xl lg:text-4xl font-normal">Active Members</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




// export default function CommunityPage() {
//   const benefits = [
//     {
//       title: "Exclusive Training Programs",
//       description: "Access to advanced workshops, masterclasses, and one-on-one mentorship sessions"
//     },
//     {
//       title: "Investment Opportunities",
//       description: "Access to exclusive investment opportunities and savings programs with competitive returns"
//     },
//     {
//       title: "Priority Loan Access",
//       description: "Fast-track approval for all loan categories with preferential interest rates"
//     },
//     {
//       title: "Free Marketplace Access",
//       description: "Join the DAW Marketplace at no cost and receive up to 10% discount on purchases"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-[#000000] flex items-center justify-center px-4 sm:px-6 lg:px-24">
//       <div className="w-full max-w-[1440px] py-16 sm:py-20 lg:py-32">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-40 items-center">
//           {/* Left Column - Benefits */}
//           <div className="flex flex-col justify-center gap-8">
//             {/* Subtitle */}
//             <p className="text-[#A7A7A7] text-base sm:text-lg leading-[28px] font-normal">
//               Become part of a thriving network of over 20,000 empowered African women entrepreneurs. Our cooperative membership offers exclusive benefits designed to accelerate your business growth and personal development.
//             </p>

//             {/* Benefits List */}
//             <div className="flex flex-col gap-6">
//               {benefits.map((benefit, index) => (
//                 <div 
//                   key={index}
//                   className="flex flex-col gap-5 p-5 sm:px-5 sm:py-[10px] rounded-[20px] bg-[#101010]"
//                 >
//                   <div className="flex flex-col gap-3">
//                     <h3 className="text-[#FFFFFF] text-lg sm:text-xl font-medium leading-[130%] tracking-[-0.4px]">
//                       {benefit.title}
//                     </h3>
//                     <p className="text-[#B5B5B5] text-base sm:text-lg font-normal leading-[140%]">
//                       {benefit.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Column - Title and Stats */}
//           <div className="flex flex-col justify-between gap-12 lg:gap-0 lg:min-h-[620px]">
//             {/* Title */}
//             <h1 className="text-[#FFFFFF] text-4xl sm:text-5xl lg:text-[48px] font-medium leading-normal">
//               Join Our Growing Community
//             </h1>

//             {/* Stats Card */}
//             <div className="flex flex-col items-center justify-center gap-0 py-10 px-8 sm:px-12 lg:px-16 rounded-[20px] bg-[#252525] self-start lg:self-auto w-full sm:w-auto">
//               <div className="text-[#F10E7C] text-4xl sm:text-5xl lg:text-[48px] font-bold leading-[140%] tracking-[-1.92px]">
//                 20,000+
//               </div>
//               <div className="text-[#FFFFFF] text-2xl sm:text-3xl lg:text-[36px] font-normal leading-[140%] tracking-[-1.44px] text-center">
//                 Active Members
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



export default function CommunityPage() {
  const benefits = [
    {
      title: "Exclusive Training Programs",
      description: "Access to advanced workshops, masterclasses, and one-on-one mentorship sessions"
    },
    {
      title: "Investment Opportunities",
      description: "Access to exclusive investment opportunities and savings programs with competitive returns"
    },
    {
      title: "Priority Loan Access",
      description: "Fast-track approval for all loan categories with preferential interest rates"
    },
    {
      title: "Free Marketplace Access",
      description: "Join the DAW Marketplace at no cost and receive up to 10% discount on purchases"
    }
  ];

  const impactStats = [
    {
      number: "8",
      description: "African Countries Impacted"
    },
    {
      number: "12",
      description: "Global Countries Impaccted"
    },
    {
      number: "20k",
      description: "Women Empowered"
    }
  ];

  const testimonials = [
    {
      quote: "Since joining the cooperative, my sales have increased by 300%. The loan I received helped me purchase better equipment, and the masterclasses taught me how to market my products online.",
      name: "Amina B.",
      role: "Textile Artisan, Lagos"
    },
    {
      quote: "The platform connected me with customers from Europe and America. I started with the Basic tier and quickly upgraded to Premium as my business grew. The support from the community has been invaluable.",
      name: "Grace M.",
      role: "Jewelry Designer, Nairobi"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Join Our Growing Community */}
      <section className="bg-[#000000] flex items-center justify-center px-4 sm:px-6 lg:px-24">
        <div className="w-full max-w-[1440px] py-16 sm:py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-40 items-center">
            {/* Left Column - Benefits */}
            <div className="flex flex-col justify-center gap-8">
              {/* Subtitle */}
              <p className="text-[#A7A7A7] text-base sm:text-lg leading-[28px] font-normal">
                Become part of a thriving network of over 20,000 empowered African women entrepreneurs. Our cooperative membership offers exclusive benefits designed to accelerate your business growth and personal development.
              </p>

              {/* Benefits List */}
              <div className="flex flex-col gap-6">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex flex-col gap-5 p-5 sm:px-5 sm:py-[10px] rounded-[20px] bg-[#101010]"
                  >
                    <div className="flex flex-col gap-3">
                      <h3 className="text-[#FFFFFF] text-lg sm:text-xl font-medium leading-[130%] tracking-[-0.4px]">
                        {benefit.title}
                      </h3>
                      <p className="text-[#B5B5B5] text-base sm:text-lg font-normal leading-[140%]">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Title and Stats */}
            <div className="flex flex-col justify-between gap-12 lg:gap-0 lg:min-h-[620px]">
              {/* Title */}
              <h1 className="text-[#FFFFFF] text-4xl sm:text-5xl lg:text-[48px] font-medium leading-normal">
                Join Our Growing Community
              </h1>

              {/* Stats Card */}
              <div className="flex flex-col items-center justify-center gap-0 py-10 px-8 sm:px-12 lg:px-16 rounded-[20px] bg-[#252525] self-start lg:self-auto w-full sm:w-auto">
                <div className="text-[#F10E7C] text-4xl sm:text-5xl lg:text-[48px] font-bold leading-[140%] tracking-[-1.92px]">
                  20,000+
                </div>
                <div className="text-[#FFFFFF] text-2xl sm:text-3xl lg:text-[36px] font-normal leading-[140%] tracking-[-1.44px] text-center">
                  Active Members
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact in Numbers Section */}
      <section className="bg-[#FFFFFF] flex items-center justify-center px-4 sm:px-6 lg:px-24">
        <div className="w-full max-w-[1440px] py-16 sm:py-20 lg:py-[120px]">
          <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
            {/* Header */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[#000000] text-4xl sm:text-5xl lg:text-[54px] font-normal leading-normal">
                Our Impact in Numbers
              </h2>
              <p className="text-[#565656] text-base sm:text-lg lg:text-xl leading-[28px] font-normal max-w-[522px]">
                Become part of a thriving network of over 20,000 empowered African women entrepreneurs. Our cooperative membership offers exclusive benefits designed to accelerate your business growth and personal development.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
              {impactStats.map((stat, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div className="text-[#000000] text-6xl sm:text-7xl lg:text-[96px] font-medium leading-normal">
                    {stat.number}
                  </div>
                  <div className="text-[#000000] text-xl sm:text-2xl font-medium leading-normal">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#F5F5F5] flex items-center justify-center px-4 sm:px-6 lg:px-24">
        <div className="w-full max-w-[1440px] py-16 sm:py-20 lg:py-20">
          <div className="flex flex-col gap-12 sm:gap-14 lg:gap-[60px]">
            {/* Header */}
            <div className="flex flex-col gap-4 items-center text-center">
              <h2 className="text-[#222222] text-3xl sm:text-4xl lg:text-[40px] font-medium leading-[120%] tracking-[-2.4px]">
                Hear From Our Members
              </h2>
              <p className="text-[#6B6B6B] text-base sm:text-lg lg:text-xl font-normal leading-[140%] tracking-[-0.8px] max-w-[575px]">
                Real testimonials from entrepreneurs who have transformed their businesses through our platform.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="flex flex-col gap-12 sm:gap-[50px] p-6 sm:p-8 lg:p-10 rounded-[20px] border border-[#F5F5F5] bg-[#FFFFFF]"
                >
                  <div className="flex flex-col gap-3">
                    {/* Quote Icon */}
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0"
                    >
                      <path d="M20.3092 17.708C22.1962 15.66 22.0062 13.03 22.0002 13V5C22.0002 4.73478 21.8948 4.48043 21.7073 4.29289C21.5197 4.10536 21.2654 4 21.0002 4H15.0002C13.8972 4 13.0002 4.897 13.0002 6V13C13.0002 13.2652 13.1055 13.5196 13.2931 13.7071C13.4806 13.8946 13.7349 14 14.0002 14H17.0782C17.0566 14.4943 16.9089 14.9749 16.6492 15.396C16.1412 16.197 15.1842 16.744 13.8032 17.02L13.0002 17.18V20H14.0002C16.7832 20 18.9062 19.229 20.3092 17.708ZM9.30216 17.708C11.1902 15.66 10.9992 13.03 10.9932 13V5C10.9932 4.73478 10.8878 4.48043 10.7003 4.29289C10.5127 4.10536 10.2584 4 9.99316 4H3.99316C2.89016 4 1.99316 4.897 1.99316 6V13C1.99316 13.2652 2.09852 13.5196 2.28606 13.7071C2.47359 13.8946 2.72795 14 2.99316 14H6.07116C6.04959 14.4943 5.90191 14.9749 5.64216 15.396C5.13416 16.197 4.17716 16.744 2.79616 17.02L1.99316 17.18V20H2.99316C5.77616 20 7.89916 19.229 9.30216 17.708Z" fill="#F10E7C"/>
                    </svg>
                    
                    {/* Quote Text */}
                    <p className="text-[#222222] text-lg sm:text-xl font-normal leading-[130%] tracking-[-0.8px]">
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-2">
                    {/* Avatar Placeholder */}
                    <div className="w-14 h-14 rounded-full bg-[#E5E5E5] border-2 border-[#FFFFFF] flex-shrink-0"></div>
                    
                    <div className="flex flex-col gap-1">
                      <div className="text-[#222222] text-base font-medium leading-[120%] tracking-[-0.96px]">
                        {testimonial.name}
                      </div>
                      <div className="text-[#6B6B6B] text-sm font-normal leading-[140%] tracking-[-0.84px]">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
