"use client";
import Header from "@/components/Header";
import Footer from "@/components/landing-page/cooperatives/Footer";
import JoinCooperative from "@/components/landing-page/cooperatives/JoinCooperative";
import { useParams } from "next/navigation";

export default function JoinCooperativePage() {
  const params = useParams();
  const id = params.id;

  return (
    <div>
      <Header />

      <JoinCooperative />
      <Footer />
    </div>
  );
}
