"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVerifyOtp } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

function OtpContent() {
    const [otp, setOtp] = useState("");
    const { verifyOtp, isLoading, error, success } = useVerifyOtp();
    const searchParams = useSearchParams();
    const mode = (searchParams.get("mode") as "signup" | "login") || "signup";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length > 0) {
            await verifyOtp(otp, mode);
        }
    };

    const title = mode === "login" ? "Verify Login" : "Verify your account";
    const buttonText = mode === "login" ? "Verify Login" : "Verify Account";

    if (success && mode === "signup") {
        return (
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="mb-4 flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
                <p className="text-gray-600 mb-6">Your email has been successfully verified. You can now log in to your account.</p>
                <Button
                    onClick={() => window.location.href = "/auth"}
                    className="w-full py-3 rounded-full bg-(--brand-pink) hover:bg-(--brand-pink)/90 text-white font-medium"
                >
                    Proceed to Login
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                    {title}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    We've sent a verification code to your email. Please enter it below.
                </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="otp" className="sr-only">
                            OTP Code
                        </Label>
                        <Input
                            id="otp"
                            name="otp"
                            type="text"
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-pink focus:ring-brand-pink sm:text-sm h-12 text-center text-lg tracking-widest"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength={6}
                            disabled={isLoading}
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading || otp.length < 4}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-(--brand-pink) hover:bg-(--brand-pink)/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-pink disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            buttonText
                        )}
                    </Button>
                </div>

                <div className="text-center text-sm">
                    <p className="text-gray-500">
                        Didn't receive the code?{" "}
                        <button
                            type="button"
                            className="font-medium text-brand-pink hover:text-brand-pink/80"
                            onClick={() => {
                               
                                alert("Resend functionality to be implemented");
                            }}
                        >
                            Resend
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
}

function OtpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Suspense fallback={<div className="flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-brand-pink" /></div>}>
                <OtpContent />
            </Suspense>
        </div>
    );
}

export default OtpPage;
