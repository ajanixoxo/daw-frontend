import Header from "@/components/Header";
import Footer from "@/components/landing-page/cooperatives/Footer";
import { MarketplaceContent } from "@/components/landing-page/marketplace/marketplace-content";

export const metadata = {
  title: "African Women Marketplace | DAW",
  description:
    "Discover authentic handcrafted products made by talented women entrepreneurs from across Africa.",
};

export default function MarketplacePage() {
  return (
    <div>
      <Header />
      <MarketplaceContent />
      <Footer />
    </div>
  );
}
