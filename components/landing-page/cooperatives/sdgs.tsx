export function OurSDGs() {
  const sdgs = [
    {
      number: 1,
      title: "NO POVERTY",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" r="4" fill="#f10e7c" />
          <circle cx="28" cy="8" r="4" fill="#f10e7c" />
          <circle cx="20" cy="16" r="4" fill="#f10e7c" />
          <circle cx="12" cy="24" r="3" fill="#f10e7c" />
          <circle cx="28" cy="24" r="3" fill="#f10e7c" />
          <circle cx="20" cy="32" r="3" fill="#f10e7c" />
        </svg>
      ),
    },
    {
      number: 4,
      title: "QUALITY EDUCATION",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="6" width="24" height="28" rx="2" fill="#f10e7c" />
          <rect x="12" y="12" width="10" height="3" rx="1" fill="#fce4ec" />
          <rect x="12" y="18" width="16" height="2" rx="1" fill="#fce4ec" />
          <rect x="12" y="23" width="14" height="2" rx="1" fill="#fce4ec" />
        </svg>
      ),
    },
    {
      number: 5,
      title: "GENDER EQUALITY",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="14" r="8" stroke="#f10e7c" strokeWidth="3" fill="none" />
          <line x1="20" y1="22" x2="20" y2="34" stroke="#f10e7c" strokeWidth="3" />
          <line x1="14" y1="28" x2="26" y2="28" stroke="#f10e7c" strokeWidth="3" />
          <line x1="28" y1="6" x2="34" y2="6" stroke="#f10e7c" strokeWidth="3" />
          <line x1="34" y1="6" x2="34" y2="12" stroke="#f10e7c" strokeWidth="3" />
          <line x1="28" y1="12" x2="34" y2="6" stroke="#f10e7c" strokeWidth="3" />
        </svg>
      ),
    },
    {
      number: 8,
      title: "DECENT WORK AND ECONOMIC GROWTH",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="20" width="8" height="16" rx="1" fill="#f10e7c" />
          <rect x="16" y="12" width="8" height="24" rx="1" fill="#f10e7c" />
          <rect x="26" y="4" width="8" height="32" rx="1" fill="#f10e7c" />
        </svg>
      ),
    },
    {
      number: 9,
      title: "INDUSTRY, INNOVATION AND INFRASTRUCTURE",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4L36 14V30L20 36L4 30V14L20 4Z" fill="#f10e7c" />
          <path d="M20 4L36 14L20 20L4 14L20 4Z" fill="#fce4ec" fillOpacity="0.3" />
          <path d="M20 20V36" stroke="#fce4ec" strokeWidth="1" />
          <path d="M4 14L20 20" stroke="#fce4ec" strokeWidth="1" />
        </svg>
      ),
    },
    {
      number: 10,
      title: "REDUCED INEQUALITIES",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="4" fill="#f10e7c" />
          <line x1="10" y1="14" x2="10" y2="24" stroke="#f10e7c" strokeWidth="2" />
          <circle cx="30" cy="10" r="4" fill="#f10e7c" />
          <line x1="30" y1="14" x2="30" y2="24" stroke="#f10e7c" strokeWidth="2" />
          <path d="M6 28L20 22L34 28" stroke="#f10e7c" strokeWidth="3" strokeLinecap="round" />
          <rect x="18" y="30" width="4" height="6" fill="#f10e7c" />
        </svg>
      ),
    },
  ]

  return (
    <section className="bg-[#fff5f9] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-medium italic text-[#f10e7c] mb-4">OUR SDGs</h2>
          <p className="text-[#666666] text-base md:text-lg">
            Our mission aligns with the following UN Sustainable Development Goals:
          </p>
        </div>

        {/* SDG Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {sdgs.map((sdg) => (
            <div key={sdg.number} className="bg-[#fce8f0] rounded-2xl p-6 md:p-8 flex flex-col">
              {/* Icon */}
              <div className="mb-8 md:mb-12">{sdg.icon}</div>

              {/* Number and Title */}
              <div className="mt-auto">
                <span className="block text-5xl md:text-6xl font-light text-[#222222] mb-2">{sdg.number}</span>
                <h3 className="text-sm md:text-base font-medium text-[#222222] tracking-wide leading-tight">
                  {sdg.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
