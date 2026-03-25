"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useCheckoutStore,
  useInitiatePayment,
  useInitiatePaystackPayment,
  useInitiatePaypalOrder,
} from "@/hooks/useCheckout";
import { calculateDeliveryFee } from "@/app/actions/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/zustand/store";
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
import Header from "@/components/Header";
import Footer from "@/components/landing-page/cooperatives/Footer";

import { COUNTRY_STATES } from "@/lib/constants/countries";

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
  const { user } = useAuthStore();
  const { mutate: initiateVigipay, isPending: isPendingVigipay } = useInitiatePayment();
  const { mutate: initiatePaystack, isPending: isPendingPaystack } = useInitiatePaystackPayment();
  const { mutate: initiatePaypal, isPending: isPendingPaypal } = useInitiatePaypalOrder();

  const isProcessingPayment = isPendingVigipay || isPendingPaystack || isPendingPaypal;

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
    differentAddress: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"vigipay" | "paystack" | "paypal">("paystack");
  const [promoCode, setPromoCode] = useState("");

  const initialDeliveryFee = (orderData?.order as any)?.delivery_fee || 0;
  const subtotal = orderData ? orderData.order.total_amount - initialDeliveryFee : 0;
  const [deliveryFee, setDeliveryFee] = useState(initialDeliveryFee);
  const [isCalculatingDelivery, setIsCalculatingDelivery] = useState(false);
  const [deliveryError, setDeliveryError] = useState("");

  const total = subtotal + deliveryFee;

  // Pre-fill form data with authenticated user details
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.billingAddress?.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: prev.email || user.billingAddress?.email || user.email || "",
        phone: prev.phone || user.billingAddress?.phone || user.phone || "",
        country: prev.country || user.billingAddress?.country || user.country || "",
        state: prev.state || user.billingAddress?.state || "",
        city: prev.city || user.billingAddress?.city || "",
        streetAddress: prev.streetAddress || user.billingAddress?.streetAddress || "",
        zipCode: prev.zipCode || user.billingAddress?.zipCode || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    async function fetchDeliveryFee() {
      if (!formData.country || !orderData?.order?._id) return;
      if (formData.country === "Nigeria" && !formData.state) return;
      
      setIsCalculatingDelivery(true);
      setDeliveryError("");
      
      try {
        const res = await calculateDeliveryFee({
          orderId: orderData.order._id,
          country: formData.country,
          state: formData.state
        });
        
        if (res.success && res.data) {
          setDeliveryFee(res.data.deliveryFee);
        } else {
          setDeliveryError(res.error || "Failed to calculate delivery fee");
        }
      } catch (err: any) {
        setDeliveryError(err.message || "Calculation failed");
      } finally {
        setIsCalculatingDelivery(false);
      }
    }
    fetchDeliveryFee();
  }, [formData.country, formData.state, orderData?.order?._id]);

  useEffect(() => {
    if (!orderData) {
      toast.error("No order found. Redirecting to cart.");
      router.push("/cart");
    }
  }, [orderData, router]);

  if (!orderData) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayment = () => {
    if (!formData.fullName || !formData.email || !formData.streetAddress) {
      toast.error("Please fill in all required fields");
      return;
    }

    const combinedOrderId = orderData.orderIds?.join(",") || orderData.order._id;

    const billingPayload = {
      description: `Checkout payment for order(s): ${combinedOrderId}`,
      name: formData.fullName,
      orderId: combinedOrderId,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      address: [formData.streetAddress],
      DeliveryAddress:
        formData.deliveryAddressType === "same"
          ? "Same as shipping address"
          : formData.differentAddress,
      zipCode: formData.zipCode,
      amount: total,
    };

    const onError = (error: any) => {
      console.error("Payment failed:", error);
      toast.error(error.message || "Failed to initiate payment");
    };

    if (paymentMethod === "vigipay") {
      initiateVigipay(billingPayload, {
        onSuccess: (data) => {
          if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
          } else {
            toast.error("No redirect URL returned");
          }
        },
        onError,
      });
    } else if (paymentMethod === "paystack") {
      initiatePaystack(billingPayload, {
        onSuccess: (data) => {
          if (data.authorizationUrl) {
            window.location.href = data.authorizationUrl;
          } else {
            toast.error("No Paystack authorization URL returned");
          }
        },
        onError,
      });
    } else if (paymentMethod === "paypal") {
      initiatePaypal(billingPayload, {
        onSuccess: (data) => {
          if (data.approvalUrl) {
            window.location.href = data.approvalUrl;
          } else {
            toast.error("No PayPal approval URL returned");
          }
        },
        onError,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD]">
      <Header />
      <main className="flex-1 py-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className=" text-4xl font-bold text-foreground mb-2">
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
                      className="bg-gray-50/50 border-gray-200 h-12 w-full"
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
                        className="bg-gray-50/50 border-gray-200 h-12 w-full"
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
                        className="bg-gray-50/50 border-gray-200 h-12 w-full"
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
                      onValueChange={(val) => {
                        handleInputChange("country", val);
                        handleInputChange("state", "");
                      }}
                    >
                      <SelectTrigger className="bg-gray-50/50 border-gray-200 h-12 w-full">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Afghanistan">Afghanistan</SelectItem>
                        <SelectItem value="Albania">Albania</SelectItem>
                        <SelectItem value="Algeria">Algeria</SelectItem>
                        <SelectItem value="Angola">Angola</SelectItem>
                        <SelectItem value="Argentina">Argentina</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Austria">Austria</SelectItem>
                        <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="Belgium">Belgium</SelectItem>
                        <SelectItem value="Benin">Benin</SelectItem>
                        <SelectItem value="Bolivia">Bolivia</SelectItem>
                        <SelectItem value="Brazil">Brazil</SelectItem>
                        <SelectItem value="Burkina Faso">Burkina Faso</SelectItem>
                        <SelectItem value="Cameroon">Cameroon</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Chad">Chad</SelectItem>
                        <SelectItem value="Chile">Chile</SelectItem>
                        <SelectItem value="China">China</SelectItem>
                        <SelectItem value="Colombia">Colombia</SelectItem>
                        <SelectItem value="Congo">Congo</SelectItem>
                        <SelectItem value="Cote d'Ivoire">Cote d&apos;Ivoire</SelectItem>
                        <SelectItem value="Czech Republic">Czech Republic</SelectItem>
                        <SelectItem value="Denmark">Denmark</SelectItem>
                        <SelectItem value="DR Congo">DR Congo</SelectItem>
                        <SelectItem value="Ecuador">Ecuador</SelectItem>
                        <SelectItem value="Egypt">Egypt</SelectItem>
                        <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                        <SelectItem value="Finland">Finland</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Gambia">Gambia</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="Ghana">Ghana</SelectItem>
                        <SelectItem value="Greece">Greece</SelectItem>
                        <SelectItem value="Guinea">Guinea</SelectItem>
                        <SelectItem value="Hungary">Hungary</SelectItem>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="Indonesia">Indonesia</SelectItem>
                        <SelectItem value="Iran">Iran</SelectItem>
                        <SelectItem value="Iraq">Iraq</SelectItem>
                        <SelectItem value="Ireland">Ireland</SelectItem>
                        <SelectItem value="Israel">Israel</SelectItem>
                        <SelectItem value="Italy">Italy</SelectItem>
                        <SelectItem value="Japan">Japan</SelectItem>
                        <SelectItem value="Jordan">Jordan</SelectItem>
                        <SelectItem value="Kazakhstan">Kazakhstan</SelectItem>
                        <SelectItem value="Kenya">Kenya</SelectItem>
                        <SelectItem value="Kuwait">Kuwait</SelectItem>
                        <SelectItem value="Lebanon">Lebanon</SelectItem>
                        <SelectItem value="Libya">Libya</SelectItem>
                        <SelectItem value="Madagascar">Madagascar</SelectItem>
                        <SelectItem value="Malawi">Malawi</SelectItem>
                        <SelectItem value="Malaysia">Malaysia</SelectItem>
                        <SelectItem value="Mali">Mali</SelectItem>
                        <SelectItem value="Mauritania">Mauritania</SelectItem>
                        <SelectItem value="Mexico">Mexico</SelectItem>
                        <SelectItem value="Morocco">Morocco</SelectItem>
                        <SelectItem value="Mozambique">Mozambique</SelectItem>
                        <SelectItem value="Myanmar">Myanmar</SelectItem>
                        <SelectItem value="Nepal">Nepal</SelectItem>
                        <SelectItem value="Netherlands">Netherlands</SelectItem>
                        <SelectItem value="New Zealand">New Zealand</SelectItem>
                        <SelectItem value="Niger">Niger</SelectItem>
                        <SelectItem value="Nigeria">Nigeria</SelectItem>
                        <SelectItem value="Norway">Norway</SelectItem>
                        <SelectItem value="Pakistan">Pakistan</SelectItem>
                        <SelectItem value="Peru">Peru</SelectItem>
                        <SelectItem value="Philippines">Philippines</SelectItem>
                        <SelectItem value="Poland">Poland</SelectItem>
                        <SelectItem value="Portugal">Portugal</SelectItem>
                        <SelectItem value="Qatar">Qatar</SelectItem>
                        <SelectItem value="Romania">Romania</SelectItem>
                        <SelectItem value="Russia">Russia</SelectItem>
                        <SelectItem value="Rwanda">Rwanda</SelectItem>
                        <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                        <SelectItem value="Senegal">Senegal</SelectItem>
                        <SelectItem value="Sierra Leone">Sierra Leone</SelectItem>
                        <SelectItem value="Singapore">Singapore</SelectItem>
                        <SelectItem value="Somalia">Somalia</SelectItem>
                        <SelectItem value="South Africa">South Africa</SelectItem>
                        <SelectItem value="South Korea">South Korea</SelectItem>
                        <SelectItem value="South Sudan">South Sudan</SelectItem>
                        <SelectItem value="Spain">Spain</SelectItem>
                        <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                        <SelectItem value="Sudan">Sudan</SelectItem>
                        <SelectItem value="Sweden">Sweden</SelectItem>
                        <SelectItem value="Switzerland">Switzerland</SelectItem>
                        <SelectItem value="Syria">Syria</SelectItem>
                        <SelectItem value="Tanzania">Tanzania</SelectItem>
                        <SelectItem value="Thailand">Thailand</SelectItem>
                        <SelectItem value="Togo">Togo</SelectItem>
                        <SelectItem value="Tunisia">Tunisia</SelectItem>
                        <SelectItem value="Turkey">Turkey</SelectItem>
                        <SelectItem value="Uganda">Uganda</SelectItem>
                        <SelectItem value="Ukraine">Ukraine</SelectItem>
                        <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Venezuela">Venezuela</SelectItem>
                        <SelectItem value="Vietnam">Vietnam</SelectItem>
                        <SelectItem value="Yemen">Yemen</SelectItem>
                        <SelectItem value="Zambia">Zambia</SelectItem>
                        <SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>State</Label>
                    <Select
                      key={formData.country}
                      onValueChange={(val) => handleInputChange("state", val)}
                      disabled={!formData.country}
                    >
                      <SelectTrigger className="bg-gray-50/50 border-gray-200 h-12 w-full">
                        <SelectValue placeholder={formData.country ? "Select State" : "Select a country first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {(COUNTRY_STATES[formData.country] ?? []).map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter Street Address"
                      className="bg-gray-50/50 border-gray-200 h-12 w-full"
                      value={formData.streetAddress}
                      onChange={(e) =>
                        handleInputChange("streetAddress", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        placeholder="Enter Zip Code"
                        className="bg-gray-50/50 border-gray-200 h-12 w-full"
                        value={formData.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                      />
                  </div>
                  </div>

                  {/* City field — commented out for now
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Select
                      onValueChange={(val) => handleInputChange("city", val)}
                    >
                      <SelectTrigger className="bg-gray-50/50 border-gray-200 h-12 w-full">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ikeja">Ikeja</SelectItem>
                        <SelectItem value="Lekki">Lekki</SelectItem>
                        <SelectItem value="Yaba">Yaba</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  */}
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

                {formData.deliveryAddressType === "different" && (
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="differentAddress">Billing Address</Label>
                    <Input
                      id="differentAddress"
                      placeholder="Enter your billing address"
                      className="bg-gray-50/50 border-gray-200 h-12 w-full"
                      value={formData.differentAddress}
                      onChange={(e) =>
                        handleInputChange("differentAddress", e.target.value)
                      }
                    />
                  </div>
                )}
              </section>

              {/* Logistics — commented out for now
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
              */}
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
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-medium flex items-center">
                        {isCalculatingDelivery ? (
                           <Loader2 className="w-4 h-4 animate-spin" />
                        ) : deliveryFee > 0 ? (
                           `₦${deliveryFee.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`
                        ) : (
                           <span className="text-xs">{deliveryError ? <span className="text-red-500">{deliveryError}</span> : "Select Address"}</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-3">Payment Method</p>
                    <div className="space-y-2">
                      {[
                        { id: "paystack", label: "Paystack", sub: "Debit / Credit Card (NGN)" },
                        { id: "paypal",   label: "PayPal",   sub: "International (USD)" },
                        { id: "vigipay",  label: "Vigipay",  sub: "Bank Transfer (NGN)" },
                      ].map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id as "vigipay" | "paystack" | "paypal")}
                          className={`w-full flex items-center justify-between border rounded-lg px-4 py-3 transition-colors text-left ${
                            paymentMethod === method.id
                              ? "border-[#F10E7C] bg-[#fff0f7]"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div>
                            <p className="text-sm font-medium">{method.label}</p>
                            <p className="text-xs text-muted-foreground">{method.sub}</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === method.id ? "border-[#F10E7C]" : "border-gray-300"
                          }`}>
                            {paymentMethod === method.id && (
                              <div className="w-2 h-2 rounded-full bg-[#F10E7C]" />
                            )}
                          </div>
                        </button>
                      ))}
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

                  {/* <div className="mb-6">
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
                  </div> */}

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
      <Footer />
    </div>
  );
}
