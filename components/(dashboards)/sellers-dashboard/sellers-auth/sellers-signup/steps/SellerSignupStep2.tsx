"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileText, LucideIcon, Loader2, X } from "lucide-react";
import { useSellerSignupStore } from "@/zustand/seller-signup-store";
import { useAuthStore } from "@/zustand/store";
import { API_ENDPOINTS } from "@/lib/api/client";
import { createServerSession } from "@/app/actions/auth";
import { toast } from "sonner";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dawbackend.funtech.dev";

interface UploadBoxProps {
  label: string;
  field: string;
  value: File | null;
  onChange: (file: File | null) => void;
  icon?: LucideIcon;
  description?: string;
  className?: string;
  error?: string;
}

const UploadBox: FC<UploadBoxProps> = ({
  label,
  field,
  value,
  onChange,
  icon: Icon = FileText,
  description,
  className = "",
  error,
}) => {
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
    // Reset the file input
    const input = document.getElementById(field) as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={field} className="text-sm font-medium text-[#1a1a1a]">
        {label}
      </Label>
      <div className="relative group">
        <input
          type="file"
          id={field}
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div
          className={`h-[140px] rounded-xl border border-dashed ${error ? "border-destructive" : value ? "border-green-500 bg-green-50/50" : "border-gray-200"} bg-[#F9F9FB] flex flex-col items-center justify-center gap-2 group-hover:bg-gray-50 transition-colors relative`}
        >
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors shadow-md"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <Icon
            className={`w-8 h-8 ${error ? "text-destructive/60" : value ? "text-green-500" : "text-[#b6b8c0]"}`}
          />
          <p
            className={`text-sm ${error ? "text-destructive" : value ? "text-green-600 font-medium" : "text-[#6b6b6b]"} text-center px-4`}
          >
            {value ? value.name : description || "Upload Document"}
          </p>
        </div>
      </div>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
};

const SellerSignupStep2: FC = () => {
  const router = useRouter();
  const { formData, updateDocuments, setStep, reset } = useSellerSignupStore();
  const { documents, shopInfo, personalInfo } = formData;
  const token = useAuthStore((s) => s.sessionData?.accessToken);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof documents, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof typeof documents, string>> = {};

    if (!documents.idDocument) newErrors.idDocument = "ID document is required";
    if (!documents.proofOfResidence)
      newErrors.proofOfResidence = "Proof of residence is required";
    if (!documents.businessCac)
      newErrors.businessCac = "Business CAC is required";
    if (!documents.passportPhotograph)
      newErrors.passportPhotograph = "Passport photograph is required";

    setErrors(newErrors);
    setSubmitError(null);

    if (Object.keys(newErrors).length !== 0) return;

    // Authenticated flow: use existing SELLER_ONBOARD endpoint
    if (isAuthenticated && token) {
      setIsSubmitting(true);
      try {
        const body = new FormData();
        body.append("name", shopInfo.shopName);
        body.append("description", shopInfo.description);
        body.append("category", shopInfo.category);
        if (shopInfo.contactNumber)
          body.append("contactNumber", shopInfo.contactNumber);
        if (shopInfo.businessAddress)
          body.append("businessAddress", shopInfo.businessAddress);
        if (shopInfo.shopLogo) body.append("shopLogo", shopInfo.shopLogo);
        if (shopInfo.shopBanner) body.append("shopBanner", shopInfo.shopBanner);
        body.append("idDocument", documents.idDocument!);
        body.append("proofOfResidence", documents.proofOfResidence!);
        body.append("businessCac", documents.businessCac!);
        body.append("passportPhotograph", documents.passportPhotograph!);

        const url = `${API_BASE_URL}${API_ENDPOINTS.SHOPS.SELLER_ONBOARD}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body,
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const msg =
            data?.message || data?.error || `Request failed (${res.status})`;
          setSubmitError(msg);
          toast.error(msg);
          return;
        }
        toast.success("Seller signup complete. Your shop has been created.");
        reset();
        router.push("/sellers/shop");
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Something went wrong.";
        setSubmitError(msg);
        toast.error(msg);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Guest flow: use GUEST_SELLER_ONBOARD endpoint
    setIsSubmitting(true);
    try {
      const body = new FormData();
      // Personal info fields
      body.append("firstName", personalInfo.firstName);
      body.append("lastName", personalInfo.lastName);
      body.append("email", personalInfo.email);
      body.append("phone", personalInfo.phone);
      body.append("password", personalInfo.password);
      body.append("confirmPassword", personalInfo.confirmPassword);
      // Shop info fields
      body.append("name", shopInfo.shopName);
      body.append("description", shopInfo.description);
      body.append("category", shopInfo.category);
      if (shopInfo.contactNumber)
        body.append("contactNumber", shopInfo.contactNumber);
      if (shopInfo.businessAddress)
        body.append("businessAddress", shopInfo.businessAddress);
      if (shopInfo.shopLogo) body.append("shopLogo", shopInfo.shopLogo);
      if (shopInfo.shopBanner) body.append("shopBanner", shopInfo.shopBanner);
      // Document files
      body.append("idDocument", documents.idDocument!);
      body.append("proofOfResidence", documents.proofOfResidence!);
      body.append("businessCac", documents.businessCac!);
      body.append("passportPhotograph", documents.passportPhotograph!);

      const url = `${API_BASE_URL}${API_ENDPOINTS.SHOPS.GUEST_SELLER_ONBOARD}`;
      const res = await fetch(url, {
        method: "POST",
        body,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          data?.message || data?.error || `Request failed (${res.status})`;
        setSubmitError(msg);
        toast.error(msg);
        return;
      }

      // Create a server session with the temp token for OTP verification
      if (data.token && data.user) {
        await createServerSession({
          userId: data.user._id,
          email: data.user.email,
          role: "seller",
          isVerified: false,
          accessToken: data.token,
          refreshToken: "",
        });

        // Store signupRole for post-OTP redirect
        sessionStorage.setItem("signupRole", "seller");
      }

      toast.success(
        "Account created! Please verify your email to complete signup."
      );
      reset();
      router.push("/otp?mode=signup");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong.";
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setStep(1);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2
          className="text-2xl font-medium text-[#1a1a1a] mb-2"
          style={{ letterSpacing: "-0.96px" }}
        >
          Documents Upload
        </h2>
      </div>

      <form onSubmit={handleNext} className="flex flex-col gap-6">
        <UploadBox
          label="Upload Valid Identification Documents: e.g. NIN, International Passport, Driver's License, Voter's Card"
          field="idDocument"
          value={documents.idDocument}
          onChange={(file) => updateDocuments({ idDocument: file })}
          error={errors.idDocument}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UploadBox
            label="Proof of residence"
            field="proofOfResidence"
            value={documents.proofOfResidence}
            onChange={(file) => updateDocuments({ proofOfResidence: file })}
            error={errors.proofOfResidence}
          />
          <UploadBox
            label="Business CAC"
            field="businessCac"
            value={documents.businessCac}
            onChange={(file) => updateDocuments({ businessCac: file })}
            error={errors.businessCac}
          />
        </div>

        <UploadBox
          label="Passport photograph"
          field="passportPhotograph"
          value={documents.passportPhotograph}
          onChange={(file) => updateDocuments({ passportPhotograph: file })}
          description="Upload Passport or Take Image"
          error={errors.passportPhotograph}
        />

        {submitError && (
          <p className="text-sm text-destructive">{submitError}</p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1 h-12 rounded-[40px] border-2 border-gray-100 bg-white text-[#b6b8c0] font-semibold text-base hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 h-12 rounded-[40px] bg-brand-pink hover:bg-brand-pink/90 text-white font-semibold text-base"
            style={{ letterSpacing: "-0.64px" }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SellerSignupStep2;
