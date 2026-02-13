"use client";

import * as React from "react";
import { Loader2, Lock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { updateWalletPin } from "@/app/actions/wallet";
import { toast } from "sonner";

export function UpdateWalletPinModal({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [pin, setPin] = React.useState("");
    const [confirmPin, setConfirmPin] = React.useState("");

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pin.length !== 4) {
            toast.error("PIN must be 4 digits");
            return;
        }
        if (pin !== confirmPin) {
            toast.error("PINs do not match");
            return;
        }

        setLoading(true);
        try {
            const result = await updateWalletPin(pin);
            if (result.success) {
                toast.success("Wallet PIN updated successfully!");
                setOpen(false);
                setPin("");
                setConfirmPin("");
            } else {
                toast.error(result.error || "Failed to update PIN");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-[#DB005F]" />
                        Update Wallet PIN
                    </DialogTitle>
                    <DialogDescription>
                        This PIN is required for processing all payouts from the business wallet.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpdate} className="space-y-6 pt-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-pin" className="text-sm font-semibold">New 4-Digit PIN</Label>
                            <Input
                                id="new-pin"
                                type="password"
                                maxLength={4}
                                placeholder="****"
                                value={pin}
                                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                                required
                                className="h-12 text-center text-2xl tracking-[1em]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-pin" className="text-sm font-semibold">Confirm New PIN</Label>
                            <Input
                                id="confirm-pin"
                                type="password"
                                maxLength={4}
                                placeholder="****"
                                value={confirmPin}
                                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
                                required
                                className="h-12 text-center text-2xl tracking-[1em]"
                            />
                        </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-lg flex gap-3 items-start border border-amber-200">
                        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0" />
                        <p className="text-[11px] text-amber-800 leading-tight">
                            Keep your PIN secure. Do not share it with anyone. This PIN authorizes real fund transfers.
                        </p>
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={loading || pin.length !== 4 || pin !== confirmPin}
                            className="w-full h-12 bg-[#DB005F] hover:bg-[#b0004d]"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Update PIN"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
