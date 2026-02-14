"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Loader2, CheckCircle, ShieldCheck, Zap } from "lucide-react";
import { createStaticAccount } from "@/app/actions/wallet";
import { toast } from "sonner";

export function WalletSetup({ onComplete }: { onComplete: () => void }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        bvn: "",
        dateOfBirth: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await createStaticAccount(formData);
            if (result.success) {
                toast.success("Wallet created successfully!");
                onComplete();
            } else {
                toast.error(result.error || "Failed to create wallet");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="max-w-2xl mx-auto mt-8 border-[#e7e8e9] shadow-xl overflow-hidden bg-white">
            <div className="flex flex-col md:flex-row">
                {/* Left Side: Info */}
                <div className="w-full md:w-5/12 bg-linear-to-br from-[#1d1d2a] to-[#2d2d3d] p-8 text-white flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 bg-[#DB005F] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#DB005F]/20">
                            <Wallet className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Cooperative Wallet</h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            Create your secure virtual account to access all financial features for your cooperative.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="h-3 w-3 text-[#DB005F]" />
                                </div>
                                <div className="text-xs">
                                    <p className="font-semibold text-white">Secure Settlement</p>
                                    <p className="text-gray-400 mt-1">Regulated virtual accounts powered by Vigipay.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <Zap className="h-3 w-3 text-[#DB005F]" />
                                </div>
                                <div className="text-xs">
                                    <p className="font-semibold text-white">Fast Payouts</p>
                                    <p className="text-gray-400 mt-1">Manage contributions and payouts efficiently.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-4 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-[10px] text-gray-400 leading-tight">
                            Identity verification via BVN is required to prevent fraud and comply with financial regulations.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-7/12 p-8 bg-white">
                    <CardHeader className="p-0 mb-8">
                        <CardTitle className="text-2xl font-bold text-[#1d1d2a]">Complete Verification</CardTitle>
                        <CardDescription className="text-gray-500">
                            Enter your details to generate your cooperative wallet.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-0">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="bvn" className="text-sm font-semibold text-[#1d1d2a]">
                                    BVN (Bank Verification Number)
                                </Label>
                                <Input
                                    id="bvn"
                                    placeholder="Enter 11-digit BVN"
                                    maxLength={11}
                                    value={formData.bvn}
                                    onChange={(e) => setFormData({ ...formData, bvn: e.target.value.replace(/\D/g, "") })}
                                    required
                                    className="h-12 border-[#e7e8e9] bg-gray-50/50 focus-visible:ring-[#DB005F] focus:bg-white transition-all text-base tracking-widest"
                                />
                                <p className="text-[10px] text-gray-400">Your BVN is used strictly for identity verification.</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dob" className="text-sm font-semibold text-[#1d1d2a]">
                                    Date of Birth
                                </Label>
                                <Input
                                    id="dob"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                    required
                                    className="h-12 border-[#e7e8e9] bg-gray-50/50 focus-visible:ring-[#DB005F] focus:bg-white transition-all text-base"
                                />
                                <p className="text-[10px] text-gray-400">Match the date recorded on your BVN profile.</p>
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 bg-[#DB005F] hover:bg-[#b0004d] text-white font-bold rounded-xl shadow-lg shadow-[#DB005F]/20 transition-all text-base"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Authenticating...
                                        </>
                                    ) : (
                                        "Verify & Create Wallet"
                                    )}
                                </Button>
                            </div>

                            <div className="flex items-center justify-center gap-2 mt-4 text-[#667185]">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-xs">Secure & Encrypted</span>
                            </div>
                        </form>
                    </CardContent>
                </div>
            </div>
        </Card>
    );
}
