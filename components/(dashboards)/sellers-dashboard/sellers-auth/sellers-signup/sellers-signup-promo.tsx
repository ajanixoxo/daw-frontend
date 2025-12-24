import type { FC } from "react";
import { CircleCheck } from "lucide-react";

const SellersSignupPromo: FC = () => {
  return (
    <div
      className="relative h-full w-full rounded-[20px] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #E91E8C 0%, #C71A7A 100%)",
      }}
    >
      <div className="flex flex-col justify-between h-full p-8 lg:p-12">
        {/* Hero Section */}
        <div className="flex flex-col gap-4">
          <h1 className="auth-heading text-white">Create Your Shop</h1>

          {/* Feature Cards */}
          <div className="flex flex-col lg:flex-row gap-5">
            <p
              className="text-white font-normal text-base"
              style={{ letterSpacing: "-0.64px", lineHeight: "19.20px" }}
            >
              Start selling your products on the DAW marketplace
            </p>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="flex flex-col gap-1 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 lg:p-4">
          <div className="flex items-center gap-3">
            <CircleCheck size={18} color="#fff" />
            <p className="text-lg font-semibold text-white">
              Cooperative members:
            </p>
          </div>
          <p className="text-white text-base">
            Create your shop for free! Non-members can create a shop for
            ₦5,000/month.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellersSignupPromo;
