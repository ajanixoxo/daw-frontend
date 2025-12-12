
import Header from "@/components/Header";
import Footer from "@/components/landing-page/cooperatives/Footer";
import { ProfilePage } from "@/components/landing-page/profile/profile-page";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Header />
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
        <ProfilePage />
      </main>
      <Footer />
    </div>
  );
}
