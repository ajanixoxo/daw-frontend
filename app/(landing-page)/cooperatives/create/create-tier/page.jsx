"use client";
import Header from "@/components/Header";
import Footer from "@/components/landing-page/cooperatives/Footer";
import TierForm from "@/components/landing-page/cooperatives/TierForm";
import { useParams } from "next/navigation";

export default function CreateTier() {
  return (
    <div>
      <Header />
      <TierForm />
      <Footer />
    </div>
  );
}
