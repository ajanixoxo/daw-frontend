"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { useCooperativeSignupStore } from "@/zustand/cooperative-signup-store";
import type { CooperativeDocumentsInfo } from "@/zustand/cooperative-signup-store";

const DEFAULT_DOCUMENTS: CooperativeDocumentsInfo = {
  idDocument: null,
  proofOfResidence: null,
  businessCac: null,
  passportPhotograph: null,
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
          className={`h-[140px] rounded-2xl border border-dashed bg-gray-50 flex flex-col items-center justify-center gap-2 hover:bg-gray-100 transition-colors ${error ? "border-red-500" : "border-gray-200"}`}
        >
          <FileText className={`w-8 h-8 ${error ? "text-red-500" : "text-gray-400"}`} />
          <p className={`text-sm text-center px-4 ${error ? "text-red-600" : "text-gray-600"}`}>
            {value ? value.name : description || "Upload Document"}
          </p>
        </div>
      </div>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}

export function CooperativeSignupStepDocs() {
  const { currentStep, formData, updateDocuments, setStep } = useCooperativeSignupStore();
  const documents: CooperativeDocumentsInfo = { ...DEFAULT_DOCUMENTS, ...formData.documents };
  const [errors, setErrors] = useState<Partial<Record<keyof CooperativeDocumentsInfo, string>>>({});

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof CooperativeDocumentsInfo, string>> = {};
    if (!documents.idDocument) newErrors.idDocument = "ID document is required";
    if (!documents.proofOfResidence) newErrors.proofOfResidence = "Proof of residence is required";
    if (!documents.businessCac) newErrors.businessCac = "Business CAC is required";
    if (!documents.passportPhotograph) newErrors.passportPhotograph = "Passport photograph is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setStep(4);
  };

  const handleBack = () => setStep(currentStep - 1);

  return (
    <div className="w-full max-w-[600px]">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-[#222]">Documents Upload</h1>
        <p className="text-sm text-gray-500">
          Upload valid identification and business documents (NIN is on the ID document if applicable)
        </p>
      </div>

      <form onSubmit={handleNext} className="space-y-6">
        <UploadBox
          label="Upload Valid Identification Documents: e.g. International Passport, Driver's License, Voter's Card"
          field="idDocument"
          value={documents.idDocument}
          onChange={(file) => updateDocuments({ idDocument: file })}
          error={errors.idDocument}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
