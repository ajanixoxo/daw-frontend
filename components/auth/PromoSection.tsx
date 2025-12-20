import type { FC } from 'react';
import QuoteIcon from '@/components/icons/QuoteIcon';

const PromoSection: FC = () => {
  return (
    <div
      className="relative h-full w-full rounded-[20px] overflow-hidden"
      style={{
        backgroundImage: 'url(/auth-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col justify-between h-full p-12 lg:p-16">
        {/* Hero Section */}
        <div className="flex flex-col gap-8">
          <h1 className="auth-heading text-white">
            Empower Your Business Journey
          </h1>

          {/* Feature Cards */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex flex-col gap-2">
              <h3 className="auth-feature-title text-white">
                Connect with African Women Entrepreneurs
              </h3>
              <p className="auth-feature-desc text-white">
                Join a vibrant community of business owners sharing insights and support.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="auth-feature-title text-white">
                Showcase Your Authentic Products
              </h3>
              <p className="auth-feature-desc text-white">
                Sell your handcrafted items to customers worldwide through our secure marketplace.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="auth-feature-title text-white">
                Grow with Business Resources
              </h3>
              <p className="auth-feature-desc text-white">
                Access masterclasses, community support, and business loans to scale your enterprise.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="flex flex-col gap-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
          <div className="flex flex-col gap-3">
            <QuoteIcon width={20} height={16} color="#ffffff" />
            <p className="auth-testimonial text-white">
              The Digital African Women Marketplace has transformed my business by connecting me with customers globally.
            </p>
          </div>
          <p className="text-white font-medium text-base" style={{ letterSpacing: '-0.64px', lineHeight: '19.20px' }}>
            - Amina Okafor, Adire Elegance
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromoSection;