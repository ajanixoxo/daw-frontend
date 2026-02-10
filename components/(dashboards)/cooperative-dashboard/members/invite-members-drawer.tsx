"use client";

import type React from "react";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ArrowLeft, Upload, UserPlus, X } from "lucide-react";

interface InviteMembersDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteMembersDrawer({
  open,
  onOpenChange,
}: InviteMembersDrawerProps) {
  const [defaultRole, setDefaultRole] = useState("seller");
  const [customMessage, setCustomMessage] = useState(""); // Currently unused by backend, but kept in UI
  const [emailAddress, setEmailAddress] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const parseCSV = async (file: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (!text) return resolve([]);
        
        // Split by newline or comma
        const emails = text
          .split(/[\n,]/)
          .map((e) => e.trim())
          .filter((e) => e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)); // Basic email regex
        
        resolve(emails);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleSaveDraft = () => {
    toast.info("Draft saving not implemented yet");
  };

  const handleSendInvitation = async () => {
    try {
      setIsLoading(true);
      let emailsToInvite: string[] = [];

      // 1. Get emails from input or CSV
      if (file) {
        emailsToInvite = await parseCSV(file);
        if (emailsToInvite.length === 0) {
          toast.error("No valid emails found in CSV");
          setIsLoading(false);
          return;
        }
      } else if (emailAddress) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
          toast.error("Please enter a valid email address");
          setIsLoading(false);
          return;
        }
        emailsToInvite = [emailAddress];
      } else {
        toast.error("Please enter an email or upload a CSV");
        setIsLoading(false);
        return;
      }

      // 2. Send invitations
      let successCount = 0;
      let failCount = 0;

      // Import dynamically to avoid server reference in client component if strict
      const { inviteMember } = await import("@/app/actions/invitations");

      // Execute sequentially to avoid overwhelming server or hitting rate limits
      for (const email of emailsToInvite) {
        const result = await inviteMember({
          email,
          role: defaultRole as "seller" | "admin",
          firstName: "Invited User", // backend handles generic names or we could parse from CSV if structure known
        });

        if (result.success) {
          successCount++;
        } else {
          console.error(`Failed to invite ${email}:`, result.error);
          failCount++;
        }
      }

      // 3. Feedback
      if (successCount > 0) {
        toast.success(`Successfully sent ${successCount} invitation(s)`);
        if (failCount > 0) {
          toast.warning(`Failed to send ${failCount} invitation(s). Check console for details.`);
        }
        
        // Reset form
        setEmailAddress("");
        setFile(null);
        setCustomMessage("");
        onOpenChange(false);
      } else {
        toast.error("Failed to send invitations. Please try again.");
      }

    } catch (error) {
      console.error("Invitation error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full p-8 overflow-y-auto sm:max-w-[540px]"
      >
        <SheetHeader className="text-left">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-[#f5f5f5]"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <SheetTitle className="text-xl font-bold text-[#1d1d2a]">
                Invite Members
              </SheetTitle>
              <SheetDescription className="text-sm text-[#838794]">
                Send invitations to join your cooperative
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {/* Default Role */}
          <div className="space-y-2">
            <Label
              htmlFor="default-role"
              className="text-sm font-medium text-[#1d1d2a]"
            >
              Default Role
            </Label>
            <Select value={defaultRole} onValueChange={setDefaultRole}>
              <SelectTrigger
                id="default-role"
                className="h-12 border-[#e4e7ec] bg-white text-[#1d1d2a] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
              >
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seller">Seller</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                {/* Removed Manager/Viewer as per requirements */}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Message */}
          <div className="space-y-2">
            <Label
              htmlFor="custom-message"
              className="text-sm font-medium text-[#1d1d2a]"
            >
              Custom Message (Optional)
            </Label>
            <Textarea
              id="custom-message"
              placeholder="Add a personal message to your invitation..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="min-h-[140px] resize-none border-[#e4e7ec] bg-white text-[#1d1d2a] placeholder:text-[#9c9faa] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
            />
          </div>

          {/* Add Recipients */}
          <div className="space-y-2">
            <Label
              htmlFor="email-address"
              className="text-sm font-medium text-[#1d1d2a]"
            >
              Add Recipients
            </Label>
            <div className="flex gap-2">
              <Input
                id="email-address"
                type="email"
                placeholder="Email Address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                disabled={!!file} // Disable if file selected
                className="h-12 flex-1 border-[#e4e7ec] bg-white text-[#1d1d2a] placeholder:text-[#9c9faa] focus:border-[#f10e7c] focus:ring-[#f10e7c]"
              />
              <Button
                size="icon"
                variant="outline"
                className="h-12 w-12 shrink-0 border-[#e4e7ec] bg-white hover:bg-[#f5f5f5]"
              >
                <UserPlus className="h-5 w-5 text-[#1d1d2a]" />
              </Button>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <div className={`relative flex min-h-[140px] flex-col items-center justify-center rounded-lg border-2 border-dashed ${file ? 'border-[#f10e7c] bg-[#fdf2f8]' : 'border-[#e4e7ec] bg-[#f9f9f9]'} px-6 py-8 text-center transition-colors hover:border-[#f10e7c]`}>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="absolute inset-0 cursor-pointer opacity-0"
                id="csv-upload"
              />
              <Upload className={`mb-3 h-6 w-6 ${file ? 'text-[#f10e7c]' : 'text-[#838794]'}`} />
              <p className="text-sm text-[#838794]">
                Upload a CSV file with email addresses or{" "}
                <label
                  htmlFor="csv-upload"
                  className="cursor-pointer font-medium text-[#1d1d2a] hover:underline"
                >
                  Browse
                </label>
              </p>
              {file && (
                <div className="mt-2 flex items-center gap-2">
                   <p className="text-xs text-[#f10e7c] font-medium">Selected: {file.name}</p>
                   <button onClick={(e) => { e.preventDefault(); setFile(null); }} className="text-xs text-red-500 hover:underline">Remove</button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              className="h-12 flex-1 border-[#e4e7ec] bg-white text-[#1d1d2a] hover:bg-[#f5f5f5]"
            >
              Save as Draft
            </Button>
            <Button
              onClick={handleSendInvitation}
              disabled={isLoading}
              className="h-12 flex-1 bg-[#f10e7c] text-white hover:bg-[#d90d6a]"
            >
              {isLoading ? "Sending..." : "Send Invitation"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

