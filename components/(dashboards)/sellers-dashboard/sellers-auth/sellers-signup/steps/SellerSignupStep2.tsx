"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileText, LucideIcon, Loader2 } from "lucide-react";
import { useSellerSignupStore } from "@/zustand/seller-signup-store";

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
          className={`h-[140px] rounded-xl border border-dashed ${error ? "border-destructive" : "border-gray-200"} bg-[#F9F9FB] flex flex-col items-center justify-center gap-2 group-hover:bg-gray-50 transition-colors`}
        >
          <Icon
            className={`w-8 h-8 ${error ? "text-destructive/60" : "text-[#b6b8c0]"}`}
          />
          <p
            className={`text-sm ${error ? "text-destructive" : "text-[#6b6b6b]"} text-center px-4`}
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
  const { formData, updateDocuments, setStep, reset } = useSellerSignupStore();
  const { documents } = formData;
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof documents, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      console.log("Submitting final form data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitting(false);

      // Clear store and potentially redirect
      alert("Signup successful!");
      reset();
      window.location.href = "/"; // Redirect to home or dashboard
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
