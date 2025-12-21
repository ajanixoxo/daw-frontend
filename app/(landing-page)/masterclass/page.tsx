import Header from "@/components/Header";
import Footer from "@/components/landing-page/cooperatives/Footer";
import { MasterclassContent } from "@/components/landing-page/masterclass/masterclass";

export const metadata = {
  title: "Masterclass | DAW",
  description:
    "Discover authentic handcrafted products made by talented women entrepreneurs from across Africa.",
};

export default function MasterclassPage() {
  return (
    <div>
      <Header />
      <MasterclassContent />
      <Footer />
    </div>
  );
}
