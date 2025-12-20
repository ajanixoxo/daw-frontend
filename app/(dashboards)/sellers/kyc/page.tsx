"use client"

import { useState } from "react"
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useVerifyNin } from "@/hooks/useKyc"
import { toast } from "sonner"

export default function KycVerificationPage() {
  const router = useRouter()
  const { mutate: verifyNin, isPending, isSuccess } = useVerifyNin()

  const [nin, setNin] = useState("")
  const [error, setError] = useState("")

  const validateNin = (value: string) => {
    // NIN should be 11 digits
    const ninRegex = /^\d{11}$/
    if (!value.trim()) {
      return "NIN is required"
    }
    if (!ninRegex.test(value)) {
      return "NIN must be exactly 11 digits"
    }
    return ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateNin(nin)
    if (validationError) {
      setError(validationError)
      return
    }

    setError("")
    verifyNin(
      { nin },
      {
        onSuccess: (response) => {
          if (response.data?.kycVerified) {
            // Redirect to create shop page after successful verification
            setTimeout(() => {
              router.push("/sellers/shop/create")
            }, 2000)
          }
        },
        onError: (error) => {
          console.error("KYC verification error:", error)
        },
      }
    )
  }

  const handleChange = (value: string) => {
    setNin(value)
    if (error) {
      setError("")
    }
  }

  if (isSuccess) {
    return (
      <main className="p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl border border-[#e7e8e9] p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#e7f6ec] flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-[#009a49]" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[#1d1d2a] mb-4">KYC Verification Successful!</h2>
            <p className="text-[#667185] mb-6">
              Your National Identification Number has been verified successfully. You can now proceed to create your shop.
            </p>
            <div className="flex justify-center">
              <Loader2 className="w-5 h-5 animate-spin text-[#f10e7c]" />
              <span className="ml-2 text-[#667185]">Redirecting to create shop...</span>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#f0f2f5] transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[#1d1d2a]" />
          </Button>
          <div>
            <h1 className="text-[28px] lg:text-[32px] font-bold text-[#000000] leading-tight">KYC Verification</h1>
            <p className="text-[14px] text-[#667185] leading-relaxed">Verify your identity to become a seller</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-[#e7e8e9] p-8">
          <div className="mb-6">
            <h2 className="text-[20px] font-semibold text-[#1d1d2a] mb-3">National Identification Number (NIN)</h2>
            <p className="text-[14px] text-[#667185] leading-relaxed">
              Please enter your 11-digit National Identification Number (NIN) to verify your identity. This is required to create a shop on our platform.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="nin" className="text-[14px] font-medium text-[#344054] mb-2">
                NIN (11 digits) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nin"
                type="text"
                value={nin}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Enter your 11-digit NIN"
                maxLength={11}
                className={`h-12 border-[#d0d5dd] focus:border-[#f10e7c] focus:ring-[#f10e7c] ${
                  error ? "border-red-500" : ""
                }`}
                disabled={isPending}
              />
              {error && <p className="text-[12px] text-red-500 mt-2">{error}</p>}
              <p className="text-[12px] text-[#667185] mt-2">
                Your NIN will be securely verified with the National Identity Management Commission (NIMC).
              </p>
            </div>

            <div className="bg-[#f9fafb] rounded-lg p-4 border border-[#e7e8e9]">
              <h3 className="text-[14px] font-semibold text-[#1d1d2a] mb-2">Why we need your NIN:</h3>
              <ul className="text-[13px] text-[#667185] space-y-1 list-disc list-inside">
                <li>To verify your identity and ensure account security</li>
                <li>To comply with regulatory requirements</li>
                <li>To protect both sellers and buyers on our platform</li>
                <li>To enable secure transactions</li>
              </ul>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isPending}
                className="flex-1 border border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb] h-12 rounded-lg font-medium text-[14px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || !nin.trim()}
                className="flex-1 bg-[#f10e7c] text-white hover:bg-[#d90d6a] h-12 rounded-lg font-medium text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify NIN"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}




