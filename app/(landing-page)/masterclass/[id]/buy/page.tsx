"use client";

import { use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/landing-page/cooperatives/Footer";
import Image from "next/image";
import { useState } from "react";
import { courses } from "@/lib/masterclass-data";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const course = courses.find((c) => c.id === parseInt(id));

  const [paymentMethod, setPaymentMethod] = useState<"saved" | "new">("new");
  const [saveCard, setSaveCard] = useState(true);

  if (!course) {
    notFound();
  }

  const subtotal = course.price;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-28 pb-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#222222] mb-4">
            Masterclass
          </h1>
          <p className="text-[#6b6b6b] text-base max-w-lg mx-auto">
            Discover authentic handcrafted products made by talented women
            entrepreneurs from across Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Left Column: Payment Methods (8 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl mb-6 py-4 px-6 text-center font-medium text-[#222222]">
              Select Payment Method
            </div>

            <div className="space-y-6">
              {/* Option: Use Saved Card */}
              <div
                onClick={() => setPaymentMethod("saved")}
                className={`flex items-center gap-4 p-5 rounded-full border cursor-pointer transition-all ${
                  paymentMethod === "saved"
                    ? "bg-white border-[#F10E7C] ring-1 ring-[#F10E7C]"
                    : "bg-[#FAFAFA] border-[#E5E5E5] hover:border-[#D2D2D2]"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "saved"
                      ? "border-[#F10E7C]"
                      : "border-[#D2D2D2]"
                  }`}
                >
                  {paymentMethod === "saved" && (
                    <div className="w-3 h-3 bg-[#F10E7C] rounded-full" />
                  )}
                </div>
                <span className="text-[#222222] font-medium">
                  Use saved card
                </span>
              </div>

              {/* Option: Add New Card */}
              <div
                onClick={() => setPaymentMethod("new")}
                className={`p-1 rounded-[12px] border transition-all ${
                  paymentMethod === "new"
                    ? "bg-white border-[#F10E7C] ring-1 ring-[#F10E7C]"
                    : "bg-[#FAFAFA] border-[#E5E5E5] hover:border-[#D2D2D2]"
                }`}
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "new"
                          ? "border-[#F10E7C]"
                          : "border-[#D2D2D2]"
                      }`}
                    >
                      {paymentMethod === "new" && (
                        <div className="w-3 h-3 bg-[#F10E7C] rounded-full" />
                      )}
                    </div>
                    <span className="text-[#222222] font-medium">
                      Add New Credit/Debit Card
                    </span>
                  </div>

                  {paymentMethod === "new" && (
                    <div className="space-y-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-[#222222] mb-2">
                          Card Holder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-6 py-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F10E7C]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#222222] mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Card Number"
                          className="w-full px-6 py-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F10E7C]/20 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-[#222222] mb-2">
                            Expire Date
                          </label>
                          <input
                            type="text"
                            placeholder="02/30"
                            className="w-full px-6 py-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F10E7C]/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#222222] mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="000"
                            className="w-full px-6 py-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F10E7C]/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          onClick={() => setSaveCard(!saveCard)}
                          className={`w-6 h-6 rounded-md flex items-center justify-center cursor-pointer border transition-all ${
                            saveCard
                              ? "bg-[#059669] border-[#059669]"
                              : "bg-white border-[#E5E5E5]"
                          }`}
                        >
                          {saveCard && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <span className="text-sm text-[#222222]">
                          Save card for future payments
                        </span>
                      </div>

                      <button className="bg-[#222222] text-white px-10 py-3 rounded-full font-semibold hover:bg-black transition-colors">
                        Add Card
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary (4 cols) */}
          <div className="lg:col-span-5">
            <div className=" border border-[#f4f4f4] rounded-3xl p-8 sticky top-28">
              <h2 className="text-xl font-bold text-[#222222] mb-8">
                Order Summary
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white border border-[#f4f4f4] rounded-2xl mb-8">
                <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-[#222222] text-sm mb-1">
                    {course.title}
                  </h3>
                  <p className="text-[#6b6b6b] text-xs line-clamp-2">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b6b6b]">Subtotal</span>
                  <span className="font-bold text-[#222222]">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b6b6b]">Tax</span>
                  <span className="font-bold text-[#222222]">
                    ₦{tax.toLocaleString()}
                  </span>
                </div>
                <div className="h-px bg-[#E5E5E5] my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#222222]">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-[#222222]">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button className="w-full bg-[#F10E7C] text-white py-4 rounded-full font-bold hover:bg-[#D40D6D] transition-colors">
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
