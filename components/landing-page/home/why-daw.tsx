import { Wifi, Monitor } from "lucide-react";
import Link from "next/link";

export function WhyDAW() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#ffeff7]">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold italic text-[#f10e7c] mb-4">
            Why DAW
          </h2>
          <p className="text-[#000000] text-base md:text-lg max-w-xl mx-auto text-pretty leading-relaxed">
            Empowering Women's Cooperatives with Smart, Scalable Management
            Tools
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Join DAW Cooperative Card */}
          <Link href="/cooperatives/join">
            <div className="bg-[#f10e7c] rounded-2xl p-6 md:p-8 min-h-[280px] md:min-h-[320px] flex flex-col">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-auto">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <div className="mt-auto">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                  Join DAW Cooperatvive
                </h3>
                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                  Experience the Power of Belonging — Join a Community that
                  Grows Together.
                </p>
              </div>
            </div>
          </Link>

          {/* Create My Own Cooperative Card */}
          <Link href="cooperatives/create">
            <div className="bg-white rounded-2xl p-6 md:p-8 min-h-[280px] md:min-h-[320px] flex flex-col border-2 border-dashed border-[#d2d2d2]">
              <div className="w-12 h-12 flex items-center justify-center mb-auto">
                <Monitor className="w-8 h-8 text-[#000000]" />
              </div>
              <div className="mt-auto">
                <h3 className="text-xl md:text-2xl font-semibold text-[#000000] mb-3">
                  Create My Own Cooperative
                </h3>
                <p className="text-[#222221]/70 text-sm md:text-base leading-relaxed">
                  Lead with Confidence — Build and Manage Your Cooperative
                  Digitally.
                </p>
              </div>
            </div>
          </Link>
<<<<<<< Updated upstream
=======

          {/* Become a Seller Card */}
          <Link
            href="/sellers/sellers-signup"
            className="flex flex-col justify-between p-6 sm:p-8 rounded-[20px] bg-[#FFFFFF] min-h-[291px] hover:border-2 hover:border-[#F10E7C] transition-all cursor-pointer"
          >
            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path
                d="M39.375 12.6562H36.5625V11.25C36.5625 10.1311 36.118 9.05806 35.3269 8.26689C34.5357 7.47572 33.4626 7.03125 32.3438 7.03125H7.03125C5.91237 7.03125 4.83931 7.47572 4.04814 8.26689C3.25697 9.05806 2.8125 10.1311 2.8125 11.25V28.125C2.8125 29.2439 3.25697 30.3169 4.04814 31.1081C4.83931 31.8993 5.91237 32.3438 7.03125 32.3438H26.7188V33.75C26.7188 34.8689 27.1632 35.9419 27.9544 36.7331C28.7456 37.5243 29.8186 37.9688 30.9375 37.9688H39.375C40.4939 37.9688 41.5669 37.5243 42.3581 36.7331C43.1493 35.9419 43.5938 34.8689 43.5938 33.75V16.875C43.5938 15.7561 43.1493 14.6831 42.3581 13.8919C41.5669 13.1007 40.4939 12.6562 39.375 12.6562ZM40.7812 33.75C40.7812 34.123 40.6331 34.4806 40.3694 34.7444C40.1056 35.0081 39.748 35.1562 39.375 35.1562H30.9375C30.5645 35.1562 30.2069 35.0081 29.9431 34.7444C29.6794 34.4806 29.5312 34.123 29.5312 33.75V16.875C29.5312 16.502 29.6794 16.1444 29.9431 15.8806C30.2069 15.6169 30.5645 15.4688 30.9375 15.4688H39.375C39.748 15.4688 40.1056 15.6169 40.3694 15.8806C40.6331 16.1444 40.7812 16.502 40.7812 16.875V33.75ZM23.9062 36.5625C23.9062 36.9355 23.7581 37.2931 23.4944 37.5569C23.2306 37.8206 22.873 37.9688 22.5 37.9688H15.4688C15.0958 37.9688 14.7381 37.8206 14.4744 37.5569C14.2107 37.2931 14.0625 36.9355 14.0625 36.5625C14.0625 36.1895 14.2107 35.8319 14.4744 35.5681C14.7381 35.3044 15.0958 35.1562 15.4688 35.1562H22.5C22.873 35.1562 23.2306 35.3044 23.4944 35.5681C23.7581 35.8319 23.9062 36.1895 23.9062 36.5625ZM37.9688 19.6875C37.9688 20.0605 37.8206 20.4181 37.5569 20.6819C37.2931 20.9456 36.9355 21.0938 36.5625 21.0938H33.75C33.377 21.0938 33.0194 20.9456 32.7556 20.6819C32.4919 20.4181 32.3438 20.0605 32.3438 19.6875C32.3438 19.3145 32.4919 18.9569 32.7556 18.6931C33.0194 18.4294 33.377 18.2812 33.75 18.2812H36.5625C36.9355 18.2812 37.2931 18.4294 37.5569 18.6931C37.8206 18.9569 37.9688 19.3145 37.9688 19.6875Z"
                fill="#222222"
              />
            </svg>
>>>>>>> Stashed changes

          {/* Become a Seller Card */}
          <Link
            href="/sellers/sellers-signup"
            className="flex flex-col justify-between p-6 sm:p-8 rounded-[20px] bg-[#FFFFFF] min-h-[291px] hover:border-2 hover:border-[#F10E7C] transition-all cursor-pointer"
          >
            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path
                d="M39.375 12.6562H36.5625V11.25C36.5625 10.1311 36.118 9.05806 35.3269 8.26689C34.5357 7.47572 33.4626 7.03125 32.3438 7.03125H7.03125C5.91237 7.03125 4.83931 7.47572 4.04814 8.26689C3.25697 9.05806 2.8125 10.1311 2.8125 11.25V28.125C2.8125 29.2439 3.25697 30.3169 4.04814 31.1081C4.83931 31.8993 5.91237 32.3438 7.03125 32.3438H26.7188V33.75C26.7188 34.8689 27.1632 35.9419 27.9544 36.7331C28.7456 37.5243 29.8186 37.9688 30.9375 37.9688H39.375C40.4939 37.9688 41.5669 37.5243 42.3581 36.7331C43.1493 35.9419 43.5938 34.8689 43.5938 33.75V16.875C43.5938 15.7561 43.1493 14.6831 42.3581 13.8919C41.5669 13.1007 40.4939 12.6562 39.375 12.6562ZM40.7812 33.75C40.7812 34.123 40.6331 34.4806 40.3694 34.7444C40.1056 35.0081 39.748 35.1562 39.375 35.1562H30.9375C30.5645 35.1562 30.2069 35.0081 29.9431 34.7444C29.6794 34.4806 29.5312 34.123 29.5312 33.75V16.875C29.5312 16.502 29.6794 16.1444 29.9431 15.8806C30.2069 15.6169 30.5645 15.4688 30.9375 15.4688H39.375C39.748 15.4688 40.1056 15.6169 40.3694 15.8806C40.6331 16.1444 40.7812 16.502 40.7812 16.875V33.75ZM23.9062 36.5625C23.9062 36.9355 23.7581 37.2931 23.4944 37.5569C23.2306 37.8206 22.873 37.9688 22.5 37.9688H15.4688C15.0958 37.9688 14.7381 37.8206 14.4744 37.5569C14.2107 37.2931 14.0625 36.9355 14.0625 36.5625C14.0625 36.1895 14.2107 35.8319 14.4744 35.5681C14.7381 35.3044 15.0958 35.1562 15.4688 35.1562H22.5C22.873 35.1562 23.2306 35.3044 23.4944 35.5681C23.7581 35.8319 23.9062 36.1895 23.9062 36.5625ZM37.9688 19.6875C37.9688 20.0605 37.8206 20.4181 37.5569 20.6819C37.2931 20.9456 36.9355 21.0938 36.5625 21.0938H33.75C33.377 21.0938 33.0194 20.9456 32.7556 20.6819C32.4919 20.4181 32.3438 20.0605 32.3438 19.6875C32.3438 19.3145 32.4919 18.9569 32.7556 18.6931C33.0194 18.4294 33.377 18.2812 33.75 18.2812H36.5625C36.9355 18.2812 37.2931 18.4294 37.5569 18.6931C37.8206 18.9569 37.9688 19.3145 37.9688 19.6875Z"
                fill="#222222"
              />
            </svg>

            <div className="flex flex-col gap-2">
              <h3 className="text-[#222222] text-xl sm:text-2xl font-medium leading-[120%] tracking-[-1.44px]">
                Become a Seller
              </h3>
              <p className="text-[#222222] text-sm font-normal leading-[150%] tracking-[-0.2px]">
                Turn Your Passion into Profit — Sell Smarter on the DAW
                Marketplace.
              </p>
            </div>
          </Link>
          <div>
            <div className="flex flex-col cursor-pointer justify-between p-6 sm:p-8 rounded-[20px] bg-[#FFFFFF] min-h-[291px]">
              <svg
                width="45"
                height="45"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  d="M39.375 12.6562H36.5625V11.25C36.5625 10.1311 36.118 9.05806 35.3269 8.26689C34.5357 7.47572 33.4626 7.03125 32.3438 7.03125H7.03125C5.91237 7.03125 4.83931 7.47572 4.04814 8.26689C3.25697 9.05806 2.8125 10.1311 2.8125 11.25V28.125C2.8125 29.2439 3.25697 30.3169 4.04814 31.1081C4.83931 31.8993 5.91237 32.3438 7.03125 32.3438H26.7188V33.75C26.7188 34.8689 27.1632 35.9419 27.9544 36.7331C28.7456 37.5243 29.8186 37.9688 30.9375 37.9688H39.375C40.4939 37.9688 41.5669 37.5243 42.3581 36.7331C43.1493 35.9419 43.5938 34.8689 43.5938 33.75V16.875C43.5938 15.7561 43.1493 14.6831 42.3581 13.8919C41.5669 13.1007 40.4939 12.6562 39.375 12.6562ZM40.7812 33.75C40.7812 34.123 40.6331 34.4806 40.3694 34.7444C40.1056 35.0081 39.748 35.1562 39.375 35.1562H30.9375C30.5645 35.1562 30.2069 35.0081 29.9431 34.7444C29.6794 34.4806 29.5312 34.123 29.5312 33.75V16.875C29.5312 16.502 29.6794 16.1444 29.9431 15.8806C30.2069 15.6169 30.5645 15.4688 30.9375 15.4688H39.375C39.748 15.4688 40.1056 15.6169 40.3694 15.8806C40.6331 16.1444 40.7812 16.502 40.7812 16.875V33.75ZM23.9062 36.5625C23.9062 36.9355 23.7581 37.2931 23.4944 37.5569C23.2306 37.8206 22.873 37.9688 22.5 37.9688H15.4688C15.0958 37.9688 14.7381 37.8206 14.4744 37.5569C14.2107 37.2931 14.0625 36.9355 14.0625 36.5625C14.0625 36.1895 14.2107 35.8319 14.4744 35.5681C14.7381 35.3044 15.0958 35.1562 15.4688 35.1562H22.5C22.873 35.1562 23.2306 35.3044 23.4944 35.5681C23.7581 35.8319 23.9062 36.1895 23.9062 36.5625ZM37.9688 19.6875C37.9688 20.0605 37.8206 20.4181 37.5569 20.6819C37.2931 20.9456 36.9355 21.0938 36.5625 21.0938H33.75C33.377 21.0938 33.0194 20.9456 32.7556 20.6819C32.4919 20.4181 32.3438 20.0605 32.3438 19.6875C32.3438 19.3145 32.4919 18.9569 32.7556 18.6931C33.0194 18.4294 33.377 18.2812 33.75 18.2812H36.5625C36.9355 18.2812 37.2931 18.4294 37.5569 18.6931C37.8206 18.9569 37.9688 19.3145 37.9688 19.6875Z"
                  fill="#222222"
                />
              </svg>

              <div className="flex flex-col gap-2">
                <h3 className="text-[#222222] text-xl sm:text-2xl font-medium leading-[120%] tracking-[-1.44px]">
                  Create My Own Cooperative
                </h3>
                <p className="text-[#222222] text-sm font-normal leading-[150%] tracking-[-0.2px]">
                  Lead with Confidence — Build and Manage Your Cooperative
                  Digitally.
                </p>
                <p className="text-white bg-[#F10E7C] px-4 py-2 rounded-xl font-semibold ">
                  Coming Soon.....
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
