"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, X } from "lucide-react";
import { useCooperativeSignupStore } from "@/zustand/cooperative-signup-store";
import type { CooperativeDocumentsInfo } from "@/zustand/cooperative-signup-store";

const DEFAULT_DOCUMENTS: CooperativeDocumentsInfo = {
  nin: "",
  passportPhotograph: null,
  businessCac: null,
};

function UploadBox({
  label,
  field,
  value,
  onChange,
  description,
  error,
}: {
  label: string;
  field: string;
  value: File | null;
  onChange: (file: File | null) => void;
  description?: string;
  error?: string;
}) {
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
    const input = document.getElementById(field) as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={field} className="text-sm font-medium text-[#222]">
        {label}
      </Label>
      <div className="relative">
        <input
          type="file"
          id={field}
          accept="image/*,.pdf"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div
          className={`h-[140px] rounded-2xl border border-dashed bg-gray-50 flex flex-col items-center justify-center gap-2 hover:bg-gray-100 transition-colors relative ${error ? "border-red-500" : "border-gray-200"}`}
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
          <FileText
            className={`w-8 h-8 ${error ? "text-red-500" : value ? "text-green-500" : "text-gray-400"}`}
          />
          <p
            className={`text-sm text-center px-4 ${error ? "text-red-600" : value ? "text-green-600 font-medium" : "text-gray-600"}`}
          >
            {value ? value.name : description || "Upload Document"}
          </p>
        </div>
      </div>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}

export function CooperativeSignupStepDocs() {
  const { currentStep, formData, updateDocuments, setStep } =
    useCooperativeSignupStore();
  const documents: CooperativeDocumentsInfo = {
    ...DEFAULT_DOCUMENTS,
    ...formData.documents,
  };
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!documents.nin.trim()) newErrors.nin = "NIN is required";
    else if (!/^\d{11}$/.test(documents.nin.trim()))
      newErrors.nin = "NIN must be 11 digits";
    if (!documents.passportPhotograph)
      newErrors.passportPhotograph = "Valid Identification is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setStep(4);
  };

  const handleBack = () => setStep(currentStep - 1);

  return (
    <div className="w-full max-w-[600px]">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-[#222]">KYC & Documents</h1>
        <p className="text-sm text-gray-500">
          Provide your NIN for verification and upload required documents
        </p>
      </div>

      <form onSubmit={handleNext} className="space-y-6">
        {/* NIN Input */}
        <div className="space-y-2">
          <Label htmlFor="nin" className="text-sm font-medium text-[#222]">
            National Identification Number (NIN){" "}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="nin"
            type="text"
            inputMode="numeric"
            placeholder="Enter your 11-digit NIN"
            maxLength={11}
            value={documents.nin}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              updateDocuments({ nin: val });
            }}
            className={`h-12 border-[#e7e8e9] bg-white text-[#222] placeholder:text-[#b6b8c0] focus:border-[#f10e7c] focus:ring-[#f10e7c] ${errors.nin ? "border-red-500" : ""}`}
          />
          {errors.nin && (
            <span className="text-xs text-red-600">{errors.nin}</span>
          )}
        </div>

        {/* Valid Identification */}
        <UploadBox
          label="Valid Identification *"
          field="passportPhotograph"
          value={documents.passportPhotograph}
          onChange={(file) => updateDocuments({ passportPhotograph: file })}
          description="Upload a clear Valid Identification"
          error={errors.passportPhotograph}
        />

        {/*Business CAC * */}
        <UploadBox
          label="Business CAC *"
          field="businessCac"
          value={documents.businessCac}
          onChange={(file) => updateDocuments({ businessCac: file })}
          description="Upload CAC certificate if available"
          error={errors.businessCac}
        />

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex-1 h-12 rounded-full border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 h-12 rounded-full bg-[#F10E7C] hover:bg-[#d00c6b] text-white font-medium"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
