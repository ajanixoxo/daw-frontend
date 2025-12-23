import SellersSignup from "@/components/(dashboards)/sellers-dashboard/sellers-auth/sellers-signup/sellers-signup";
import SellersSignupPromo from "@/components/(dashboards)/sellers-dashboard/sellers-auth/sellers-signup/sellers-signup-promo";
import Image from "next/image";
import Link from "next/link";

export default function SellersSignupPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[550px] flex flex-col items-center justify-start p-6 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-[500px] flex flex-col gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-full.png"
              alt="DAW Logo"
              width={120}
              height={24}
              className="h-6 w-auto"
              priority
            />
          </Link>

          {/* Form Component */}
          <SellersSignup />
        </div>
      </div>

      {/* Right Section - Promo */}
      <div className="flex-1 hidden lg:flex p-4">
        <SellersSignupPromo />
      </div>
    </div>
  );
}

