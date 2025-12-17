"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckoutStore, useInitiatePayment } from "@/hooks/useCheckout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const LOGISTICS_OPTIONS = [
  { id: "fedex-express", name: "FedEx Express", time: "2weeks", price: 200 },
  {
    id: "dhl-express",
    name: "DHL Express",
    time: "2-3 business days",
    price: 150,
  },
  { id: "fedex-standard", name: "FedEx Standard", time: "2weeks", price: 100 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { orderData } = useCheckoutStore();
  const { mutate: initiatePayment, isPending: isProcessingPayment } =
    useInitiatePayment();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    streetAddress: "",
    zipCode: "",
    deliveryAddressType: "same", // 'same' or 'different'
  });

  const [selectedLogistics, setSelectedLogistics] = useState(
    LOGISTICS_OPTIONS[1].id
  );
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    if (!orderData) {
      toast.error("No order found. Redirecting to cart.");
      router.push("/cart");
    }
  }, [orderData, router]);

  if (!orderData) return null;

  const selectedLogisticsOption = LOGISTICS_OPTIONS.find(
    (l) => l.id === selectedLogistics
  )!;
  const shippingCost = 1500; // Fixed shipping/processing fee
  const deliveryCost = selectedLogisticsOption.price;

  // Assuming orderData.total_amount is the subtotal of items
  const subtotal = orderData.order.total_amount;
  const tax = subtotal * 0.075;

  const total = subtotal + shippingCost + tax + deliveryCost;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayment = () => {
    // Basic validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.streetAddress ||
      !formData.city
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const payload = {
      description: `Checkout payment for order #${orderData.order._id}`,
      name: formData.fullName,
      orderId: orderData.order._id,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      address: [formData.streetAddress],
      DeliveryAddress:
        formData.deliveryAddressType === "same"
          ? "Same as shipping address"
          : "Different address",
      zipCode: formData.zipCode,
      logisticsInfo: `${selectedLogisticsOption.name} (${selectedLogisticsOption.time})`,
    };

    initiatePayment(payload, {
      onSuccess: (data) => {
        toast.success("Payment initiated successfully");
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          toast.error("No redirect URL returned");
        }
      },
      onError: (error: any) => {
        console.error("Payment failed:", error);
        toast.error(error.message || "Failed to initiate payment");
      },
    });
  };

  return (
    <main className="min-h-screen bg-background py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
            Checkout
          </h1>
          <p className="text-muted-foreground text-sm">
            Home / Shopping Cart / Checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Forms */}
          <div className="lg:col-span-7 space-y-10">
            {/* Billing Details */}
            <section>
              <div className="bg-white border border-gray-100 rounded-lg p-4 mb-6 text-center font-medium">
                Billing Details
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    className="bg-gray-50/50 border-gray-200 h-12"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="hello@example.com"
                      className="bg-gray-50/50 border-gray-200 h-12"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="Enter Number"
                      className="bg-gray-50/50 border-gray-200 h-12"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select
                      onValueChange={(val) => handleInputChange("country", val)}
                    >
                      <SelectTrigger className="bg-gray-50/50 border-gray-200 h-12">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nigeria">Nigeria</SelectItem>
                        <SelectItem value="Ghana">Ghana</SelectItem>
                        <SelectItem value="Kenya">Kenya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Select
                      onValueChange={(val) => handleInputChange("state", val)}
                    >
                      <SelectTrigger className="bg-gray-50/50 border-gray-200 h-12">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lagos">Lagos</SelectItem>
                        <SelectItem value="Abuja">Abuja</SelectItem>
                        <SelectItem value="Rivers">Rivers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter Street Address"
                    className="bg-gray-50/50 border-gray-200 h-12"
                    value={formData.streetAddress}
                    onChange={(e) =>
                      handleInputChange("streetAddress", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Select
                      onValueChange={(val) => handleInputChange("city", val)}
                    >
                      <SelectTrigger className="bg-gray-50/50 border-gray-200 h-12">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ikeja">Ikeja</SelectItem>
                        <SelectItem value="Lekki">Lekki</SelectItem>
                        <SelectItem value="Yaba">Yaba</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      placeholder="Enter Zip Code"
                      className="bg-gray-50/50 border-gray-200 h-12"
                      value={formData.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Delivery Address */}
            <section className="space-y-4">
              <h3 className="text-sm font-medium">Delivery Address</h3>
              <RadioGroup
                defaultValue="same"
                className="flex flex-col md:flex-row gap-4"
                onValueChange={(val: string) =>
                  handleInputChange("deliveryAddressType", val)
                }
              >
                <div
                  className={`flex items-center space-x-2 border rounded-lg p-4 flex-1 transition-colors ${
                    formData.deliveryAddressType === "same"
                      ? "border-[#F10E7C] bg-[#fff0f7]"
                      : "border-gray-200"
                  }`}
                >
                  <RadioGroupItem
                    value="same"
                    id="same"
                    className="text-[#F10E7C]"
                  />
                  <Label htmlFor="same" className="cursor-pointer">
                    Same as shipping address
                  </Label>
                </div>
                <div
                  className={`flex items-center space-x-2 border rounded-lg p-4 flex-1 transition-colors ${
                    formData.deliveryAddressType === "different"
                      ? "border-[#F10E7C] bg-[#fff0f7]"
                      : "border-gray-200"
                  }`}
                >
                  <RadioGroupItem
                    value="different"
                    id="different"
                    className="text-[#F10E7C]"
                  />
                  <Label htmlFor="different" className="cursor-pointer">
                    Use a different billing address
                  </Label>
                </div>
              </RadioGroup>
            </section>

            {/* Logistics */}
            <section className="space-y-4">
              <h3 className="text-sm font-medium">Logistics</h3>
              <RadioGroup
                value={selectedLogistics}
                onValueChange={setSelectedLogistics}
                className="space-y-3"
              >
                {LOGISTICS_OPTIONS.map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedLogistics === option.id
                        ? "border-[#F10E7C] bg-gray-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedLogistics(option.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={option.id}
                        id={option.id}
                        className="text-[#F10E7C]"
                      />
                      <div className="space-y-1">
                        <Label
                          htmlFor={option.id}
                          className="font-medium cursor-pointer"
                        >
                          {option.name}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Delivery Timeline: {option.time}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold">₦{option.price}</span>
                  </div>
                ))}
              </RadioGroup>
            </section>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-lg font-medium mb-6">Order Summary</h2>

              <Card className="p-6 border-none shadow-sm bg-white">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      ₦
                      {subtotal.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      ₦
                      {shippingCost.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">
                      ₦
                      {tax.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-medium">
                      ₦
                      {deliveryCost.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total</span>
                    <span className="text-xl font-bold text-[#F10E7C]">
                      ₦
                      {total.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <Label className="text-xs mb-2 block">Promo Code</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter Code"
                      className="bg-gray-50/50"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" className="px-6">
                      Apply
                    </Button>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#222] hover:bg-[#333] text-white h-12 rounded-lg"
                  onClick={handlePayment}
                  disabled={isProcessingPayment}
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Proceed to Payment"
                  )}
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
