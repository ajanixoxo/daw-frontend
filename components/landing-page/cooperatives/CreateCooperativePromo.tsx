import type { FC } from "react";
import QuoteIcon from "@/components/icons/QuoteIcon";
import { CircleCheck } from "lucide-react";

const PromoSection: FC = () => {
  return (
    <div
      className="relative h-full w-full rounded-[20px] overflow-hidden"
      style={{
        backgroundImage: "url(/auth-background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col justify-between h-full p-8 lg:p-12">
        {/* Hero Section */}
        <div className="flex flex-col gap-4">
          <h1 className="auth-heading text-white">Create Your Cooperative</h1>

          {/* Feature Cards */}
          <div className="flex flex-col lg:flex-row gap-5">
            <p
              className="text-white font-normal text-base"
              style={{ letterSpacing: "-0.64px", lineHeight: "19.20px" }}
            >
              Set up your cooperative and start managing members and
              contributions
            </p>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="flex flex-col gap-1 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 lg:p-4">
          <div className="flex items-center  gap-3">
            <CircleCheck size={18} color="#fff" />
            <p className="text-lg font-semibold text-white">
              Cooperative members:
            </p>
          </div>
          <p className="text-white  text-base">
            Create your shop for free! Non-members can create a shop for
            ₦20,000 or $25 / month
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
