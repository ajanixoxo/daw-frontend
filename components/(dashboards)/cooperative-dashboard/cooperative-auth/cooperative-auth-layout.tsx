import { CheckCircle2 } from "lucide-react";

interface CooperativeAuthLayoutProps {
  children: React.ReactNode;
}

export default function CooperativeAuthLayout({
  children,
}: CooperativeAuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left Side - Form Area */}
      <div className="flex w-full flex-col justify-center px-6 py-10 lg:w-1/2 lg:px-20 xl:px-24">
        {children}
      </div>

      {/* Right Side - Gradient Section */}
      <div className="hidden w-1/2 p-4 lg:flex lg:h-screen lg:fixed lg:right-0 lg:top-0">
        <div className="relative flex h-full w-full flex-col justify-between rounded-[32px] bg-gradient-to-br from-[#d90368] to-[#9d06b5] px-10 py-16 text-white overflow-hidden">
          {/* Top Content */}
          <div className="relative z-10">
            <h1 className="mb-4 font-inter text-[40px] font-medium leading-tight tracking-tight">
              Join DAW Cooperative
            </h1>
            <p className="max-w-[400px] text-lg text-white/90">
              Fill out this application to join our cooperative community
            </p>
          </div>

          {/* Bottom Card */}
          <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
            <div className="mb-3 flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-white" />
              <h3 className="text-xl font-medium">Cooperative members:</h3>
            </div>
            <p className="text-base leading-relaxed text-white/90">
              Create your shop for free! Non-members can create a shop for{" "}
              <span className="font-semibold">₦20,000 or $25 / month</span>.
            </p>
          </div>

          {/* Abstract blobs/gradients for visual flare if needed */}
          <div className="absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-[#ff0080] blur-[100px] opacity-40 mix-blend-overlay"></div>
          <div className="absolute -left-20 -bottom-20 h-[400px] w-[400px] rounded-full bg-[#7a04eb] blur-[80px] opacity-40 mix-blend-overlay"></div>
        </div>
      </div>
    </div>
  );
}
