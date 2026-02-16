export default function Footer() {
  const navigation = {
    column1: [
      { name: "Home", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Masterclass", href: "#" },
      { name: "Community", href: "#" },
      { name: "Agent Support", href: "#" },
    ],
    column2: [
      { name: "Dashboard", href: "#" },
      { name: "Shipping Guidelines", href: "#" },
      { name: "Loan Information", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z"
            fill="#6B6B6B"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28004 9.09 5.11004 7.38 3.00004 4.79C2.63004 5.42 2.42004 6.16 2.42004 6.94C2.42004 8.43 3.17004 9.75 4.33004 10.5C3.62004 10.5 2.96004 10.3 2.38004 10V10.03C2.38004 12.11 3.86004 13.85 5.82004 14.24C5.19088 14.4129 4.53008 14.4369 3.89004 14.31C4.16165 15.1625 4.69358 15.9084 5.41106 16.4429C6.12854 16.9775 6.99549 17.2737 7.89004 17.29C6.37371 18.4905 4.49405 19.1394 2.56004 19.13C2.22004 19.13 1.88004 19.11 1.54004 19.07C3.44004 20.29 5.70004 21 8.12004 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z"
            fill="#6B6B6B"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 17.7383 21.3889 19.2135 20.3012 20.3012C19.2135 21.3889 17.7383 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 6.26174 2.61107 4.78649 3.69878 3.69878C4.78649 2.61107 6.26174 2 7.8 2ZM7.6 4C6.64522 4 5.72955 4.37928 5.05442 5.05442C4.37928 5.72955 4 6.64522 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C17.3548 20 18.2705 19.6207 18.9456 18.9456C19.6207 18.2705 20 17.3548 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.5815 5.5 17.8995 5.6317 18.1339 5.86612C18.3683 6.10054 18.5 6.41848 18.5 6.75C18.5 7.08152 18.3683 7.39946 18.1339 7.63388C17.8995 7.8683 17.5815 8 17.25 8C16.9185 8 16.6005 7.8683 16.3661 7.63388C16.1317 7.39946 16 7.08152 16 6.75C16 6.41848 16.1317 6.10054 16.3661 5.86612C16.6005 5.6317 16.9185 5.5 17.25 5.5ZM12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z"
            fill="#6B6B6B"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z"
            fill="#6B6B6B"
          />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E5E5E5]">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[84px] py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-8 lg:col-span-3">
            <div className="flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2160_116044)">
                  <path
                    d="M11.3714 6.64356C11.1352 4.61924 10.8857 2.48186 10.8857 0H13.1143C13.1143 2.45399 12.866 4.58864 12.6301 6.61524C12.4379 8.2668 12.2541 9.8466 12.22 11.469C13.339 10.3018 14.3178 9.0642 15.3432 7.76778C16.6075 6.16938 17.9426 4.48167 19.6974 2.72678L21.2732 4.30262C19.538 6.03786 17.8528 7.37166 16.253 8.63796L16.2515 8.6391C14.9485 9.67068 13.7019 10.6574 12.531 11.78C14.1474 11.7459 15.7147 11.563 17.3563 11.3714C19.3807 11.1352 21.5182 10.8857 24 10.8857V13.1143C21.5461 13.1143 19.4114 12.8659 17.3849 12.6301L17.3834 12.63C15.7322 12.4379 14.1529 12.2542 12.531 12.22C13.6974 13.3381 14.9344 14.3165 16.2299 15.3412L16.232 15.343C17.8304 16.6073 19.5182 17.9423 21.2732 19.6974L19.6974 21.2732C17.9621 19.538 16.6284 17.853 15.3623 16.2533L15.3593 16.2492L15.3568 16.2459C14.3265 14.9449 13.3409 13.7003 12.22 12.531C12.2541 14.1534 12.4379 15.7332 12.6301 17.3848C12.866 19.4114 13.1143 21.546 13.1143 24H10.8857C10.8857 21.5182 11.1352 19.3808 11.3714 17.3564L11.3719 17.3531C11.5632 15.7126 11.7459 14.1463 11.78 12.531C10.6591 13.7003 9.6735 14.9449 8.64324 16.2459L8.64072 16.2492L8.63772 16.2533C7.3716 17.853 6.03786 19.538 4.30262 21.2732L2.72678 19.6974C4.48175 17.9423 6.16956 16.6073 7.76802 15.343L7.77006 15.3412C9.06564 14.3165 10.3026 13.3381 11.469 12.22C9.8466 12.2542 8.26674 12.438 6.61506 12.6301C4.58856 12.8659 2.4539 13.1143 0 13.1143V10.8857C2.48186 10.8857 4.61936 11.1352 6.64368 11.3714C8.28534 11.563 9.8526 11.7459 11.469 11.78C10.2976 10.657 9.05058 9.66996 7.74696 8.63796C6.14718 7.37166 4.462 6.03786 2.72678 4.30262L4.30262 2.72678C6.05742 4.48167 7.39254 6.16938 8.6568 7.76778C9.6822 9.06414 10.661 10.3018 11.78 11.4689C11.7459 9.85362 11.5632 8.28738 11.3719 6.64686L11.3714 6.64356Z"
                    fill="#F10E7C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2160_116044">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="text-[#F10E7C] text-lg sm:text-xl font-medium tracking-[-1.2px]">
                Digital African Women
              </span>
            </div>
            <p className="text-[#6B6B6B] text-sm sm:text-base font-normal leading-[140%] tracking-[-0.64px]">
              Empowering entrepreneurs through digital commerce, education, and
              community.
            </p>
          </div>

          {/* Navigation Column 1 */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {navigation.column1.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[#222222] text-[17px] font-normal tracking-[-0.02em] hover:text-[#F10E7C] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Navigation Column 2 */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {navigation.column2.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[#222222] text-[17px] font-normal tracking-[-0.02em] hover:text-[#F10E7C] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col gap-8 lg:col-span-5 lg:pl-10">
            <h4 className=" text-[18px]  tracking-[-0.03em] leading-tight">
              Subscribe to our newsletter for updates
            </h4>

            <div className="relative flex h-[72px] w-full max-w-[540px] items-center rounded-full border border-[#E5E5E5] bg-white p-[7px] transition-all focus-within:border-[#F10E7C]/30">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-transparent pl-8 text-[18px] font-normal text-[#1A1A1A] placeholder:text-[#ADADAD] outline-none"
              />
              <button className="h-full px-6 rounded-full bg-[#F10E7C] hover:bg-[#d00c69] transition-all active:scale-[0.98] shadow-md hover:shadow-lg">
                <span className="text-white text-[18px] font-semibold tracking-[-0.01em]">
                  Subscribe
                </span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-8 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="text-[#6B6B6B] hover:text-[#F10E7C] transition-all hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[#E5E5E5]">
          <p className="text-[#6B6B6B] text-xs sm:text-sm font-normal leading-[140%] tracking-[-0.48px] text-center">
            © 2025 Digital African Woman Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
