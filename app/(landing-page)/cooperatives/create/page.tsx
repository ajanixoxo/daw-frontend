"use client";

import Header from "@/components/Header";
import CreateCooperativeForm from "@/components/landing-page/cooperatives/CreateCooperative";
import Footer from "@/components/landing-page/cooperatives/Footer";
import { useEffect, useState } from "react";

export default function Page() {
  return (
    <div className="flex flex-col">
      <Header />
      <CreateCooperativeForm />
      <Footer />
    </div>
  );
}
